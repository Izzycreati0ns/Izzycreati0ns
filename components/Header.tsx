import React from 'react';
import { SearchIcon, XIcon, MoonIcon, SunIcon, ZoomInIcon, ZoomOutIcon, RefreshIcon, ChevronsDownIcon, ChevronsUpIcon } from './Icons';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  searchTerm: string;
  onSearch: (term: string) => void;
  onClearSearch: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleTheme,
  searchTerm,
  onSearch,
  onClearSearch,
  onZoomIn,
  onZoomOut,
  onFit,
  onExpandAll,
  onCollapseAll
}) => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-blue-500/20">
            MB
          </div>
        </div>
        <div>
          <h1 className="font-bold text-slate-900 dark:text-white leading-tight text-lg">Mutengo wa Banja</h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Chakumanda Family Tree</p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
        {/* Search Bar */}
        <div className="relative group flex-1 md:flex-none">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <SearchIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search family member..."
            className="w-full md:w-72 pl-10 pr-9 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400"
          />
          {searchTerm && (
            <button
              onClick={onClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-400 transition-colors"
            >
              <XIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button onClick={onExpandAll} className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-lg text-slate-500 dark:text-slate-400 transition-all" title="Expand All">
            <ChevronsDownIcon className="w-4 h-4" />
          </button>
          <button onClick={onCollapseAll} className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-lg text-slate-500 dark:text-slate-400 transition-all" title="Collapse All">
            <ChevronsUpIcon className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <button onClick={onFit} className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-lg text-slate-500 dark:text-slate-400 transition-all" title="Reset View">
            <RefreshIcon className="w-4 h-4" />
          </button>
          <button onClick={onZoomOut} className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-lg text-slate-500 dark:text-slate-400 transition-all" title="Zoom Out">
            <ZoomOutIcon className="w-4 h-4" />
          </button>
          <button onClick={onZoomIn} className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-lg text-slate-500 dark:text-slate-400 transition-all" title="Zoom In">
            <ZoomInIcon className="w-4 h-4" />
          </button>
        </div>
        
        <button
            onClick={toggleTheme}
            className="ml-1 p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-600 dark:text-slate-300 transition-colors"
            title="Toggle Theme"
          >
            {darkMode ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
      </div>
    </header>
  );
};
