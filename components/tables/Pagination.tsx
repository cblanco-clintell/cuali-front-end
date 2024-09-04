import React from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsRight, FiChevronsLeft } from 'react-icons/fi';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex flex-col items-center" id="pagination">
            <div className="inline-flex xs:mt-0">
                <button
                    className="flex items-center justify-center px-3 h-8 text-sm rounded-s hover:bg-gray-100 border-gray-700 text-gray-400"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                >
                    <FiChevronsLeft className="w-3.5 h-3.5 me-2 rtl:rotate-180" />
                </button>
                <button
                    className="flex items-center justify-center px-3 h-8 text-sm rounded-s hover:bg-gray-100 border-gray-700 text-gray-400"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <FiChevronLeft className="w-3.5 h-3.5 me-2 rtl:rotate-180" />
                </button>
                <div className='text-xs my-2 text-gray-400'>
                    Página {currentPage} de {totalPages}
                </div>
                <button
                    className="flex items-center justify-center px-3 h-8 text-sm rounded-s hover:bg-gray-100 border-gray-700 text-gray-400"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >
                    <FiChevronRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                </button>
                <button
                    className="flex items-center justify-center px-3 h-8 text-sm rounded-s hover:bg-gray-100 border-gray-700 text-gray-400"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <FiChevronsRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                </button>
            </div>
        </div>
    );
}

export default Pagination;
