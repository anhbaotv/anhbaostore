
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface HeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
    return (
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 px-6 bg-[#111] border-b-2 border-gray-800 shadow-md">
            <h1 className="text-2xl md:text-3xl font-bold text-[#00a8ff] flex items-center gap-3 whitespace-nowrap">
                <span className="w-8 h-8 bg-[#00a8ff] rounded-md"></span>
                <span>ANHBAO Store</span>
            </h1>
            <div className="relative w-full max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    id="searchInput"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 bg-[#222] text-white border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[#00a8ff] focus:border-transparent transition"
                    placeholder="Tìm kiếm ứng dụng..."
                />
            </div>
        </header>
    );
};