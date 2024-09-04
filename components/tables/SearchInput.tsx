import React, { ChangeEvent } from 'react';
import { PiMagnifyingGlass } from "react-icons/pi";

interface SearchInputProps {
    searchTerm: string;
    onSearchChange: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, onSearchChange }) => {
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    return (
        <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <PiMagnifyingGlass className="text-gray-400" />
            </span>
            <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-9 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300 focus:border-purple-600"
            />
        </div>
    );
};

export default SearchInput;
