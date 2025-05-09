import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, XIcon, MenuIcon } from 'lucide-react';
import { useStore } from '../context/StoreContext';
export const Header = () => {
  const {
    setSearchQuery,
    searchQuery
  } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const clearSearch = () => {
    setSearchQuery('');
  };
  return <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            rainforest
          </span>
        </Link>
        {/* Mobile menu button */}
        <button className="md:hidden text-slate-500 hover:text-slate-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <MenuIcon size={24} />
        </button>
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <div className="flex items-center bg-slate-50 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all">
              <SearchIcon size={18} className="text-slate-400" />
              <input type="text" placeholder="Search products..." value={searchQuery} onChange={handleSearchChange} className="bg-transparent border-none focus:outline-none text-slate-900 placeholder-slate-400 ml-2 w-64" />
              {searchQuery && <button onClick={clearSearch} className="text-slate-400 hover:text-slate-600">
                  <XIcon size={16} />
                </button>}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/order-status" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Track Order
            </Link>
            <Link to="/admin" className="text-sm font-medium px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && <div className="md:hidden bg-white px-4 py-3 border-t border-slate-200">
          <div className="flex items-center bg-slate-50 rounded-lg px-3 py-2 mb-3">
            <SearchIcon size={18} className="text-slate-400" />
            <input type="text" placeholder="Search products..." value={searchQuery} onChange={handleSearchChange} className="bg-transparent border-none focus:outline-none text-slate-900 placeholder-slate-400 ml-2 w-full" />
            {searchQuery && <button onClick={clearSearch} className="text-slate-400 hover:text-slate-600">
                <XIcon size={16} />
              </button>}
          </div>
          <div className="flex flex-col space-y-2">
            <Link to="/order-status" className="text-sm font-medium text-slate-600 hover:text-blue-600 py-2" onClick={() => setMobileMenuOpen(false)}>
              Track Order
            </Link>
            <Link to="/admin" className="text-sm font-medium px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-center" onClick={() => setMobileMenuOpen(false)}>
              Admin Portal
            </Link>
          </div>
        </div>}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 py-2 text-sm text-center md:text-left text-white">
          <p>Mine for it, don't buy it. Pay with hashpower instead of money!</p>
        </div>
      </div>
    </header>;
};