import React, { useState, useEffect } from 'react';
import { Pagination } from '@/components/common';

interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  searchAccessor?: (row: T) => string;
  sortAccessor?: (row: T) => string | number;
  sortable?: boolean;
}

interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick: (row: T) => void;
  pageSize?: number;
  searchTerm?: string;
}

const GenericTable = <T extends {}>({ data, columns, onRowClick, pageSize = 20, searchTerm = '' }: GenericTableProps<T>) => {
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [filteredData, setFilteredData] = useState(data);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = data.filter(item =>
        columns.some(column => {
          const valueToSearch = column.searchAccessor ? column.searchAccessor(item) : column.accessor(item);
          return String(valueToSearch).toLowerCase().includes(lowerCaseSearchTerm);
        })
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
    setPage(1); // Reset to first page when search term changes
  }, [searchTerm, data, columns]);

  useEffect(() => {
    if (sortColumn) {
      const sorted = [...filteredData].sort((a, b) => {
        const column = columns.find(col => col.header === sortColumn);
        if (!column || !column.sortable) return 0;

        const aValue = column.sortAccessor ? column.sortAccessor(a) : column.accessor(a);
        const bValue = column.sortAccessor ? column.sortAccessor(b) : column.accessor(b);
        if (aValue && bValue) {
          if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
      setFilteredData(sorted);
    }
  }, [sortColumn, sortOrder, filteredData, columns]);

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const showPagination = totalPages > 1;

  return (
    <div className="w-full h-full">
      <div className="block w-full overflow-x-auto">
        <table className="items-center bg-transparent w-full border-collapse">
          <thead>
            <tr className='bg-gray-50 border-b border-gray-200'>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-slate-600 text-xs font-medium leading-none text-left p-3 cursor-pointer"
                  onClick={() => column.sortable && handleSort(column.header)}
                >
                  {column.header}
                  {column.sortable && (
                    <span>
                      {sortColumn === column.header ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => {
                  setSelectedRow(row);
                  onRowClick(row);
                }}
                className={selectedRow === row ? "bg-gray-200" : "border-b border-gray-200 hover:bg-gray-100"}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left text-blueGray-700 p-[0.5rem]">
                    {column.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenericTable;
