// StudiosDropdown.tsx

import React, { useState, useEffect, useRef } from 'react';
import { StudioType } from '@/types/studios';

interface StudiosDropdownProps {
  studios: StudioType[];
  selectedStudios: number[];
  onStudioSelect: (selectedIds: number[]) => void;
}

const StudiosDropdown: React.FC<StudiosDropdownProps> = ({
  studios,
  selectedStudios,
  onStudioSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudios, setFilteredStudios] = useState<StudioType[]>(studios);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter studios based on search term
  useEffect(() => {
    setFilteredStudios(
      studios.filter((studio) =>
        studio.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, studios]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (studioId: number) => {
    let newSelectedStudios;
    if (selectedStudios.includes(studioId)) {
      // Deselect
      newSelectedStudios = selectedStudios.filter((id) => id !== studioId);
    } else {
      // Select
      newSelectedStudios = [...selectedStudios, studioId];
    }
    onStudioSelect(newSelectedStudios);
  };

  return (
    <div className="relative w-full text-left" ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium border rounded-lg"
      >
        <span>
          {selectedStudios.length > 0
            ? `${selectedStudios.length} Study Group(s) Selected`
            : 'Select Study Groups'}
        </span>
        <svg
          className="w-2.5 h-2.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow">
          <div className="p-3">
            <label htmlFor="input-group-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full p-2.5 pl-10 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search studios"
              />
            </div>
          </div>
          <ul
            className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700"
            aria-labelledby="dropdownSearchButton"
          >
            {filteredStudios.map((studio) => (
              <li key={studio.id}>
                <div className="flex items-center p-2 rounded hover:bg-gray-100">
                  <input
                    id={`checkbox-studio-${studio.id}`}
                    type="checkbox"
                    checked={selectedStudios.includes(studio.id)}
                    onChange={() => handleCheckboxChange(studio.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`checkbox-studio-${studio.id}`}
                    className="w-full ml-2 text-sm font-medium text-gray-900"
                  >
                    {studio.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center w-full p-3 text-sm font-medium text-red-600 bg-gray-50 border-t border-gray-200 rounded-b-lg hover:bg-gray-100 hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default StudiosDropdown;