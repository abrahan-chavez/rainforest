import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PackageIcon, LayoutDashboardIcon, LogOutIcon } from 'lucide-react';
export const AdminNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  const handleLogout = () => {
    navigate('/admin');
  };
  return <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                rainforest admin
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/admin/dashboard" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/admin/dashboard') ? 'border-b-2 border-blue-500 text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                <LayoutDashboardIcon size={16} className="mr-2" />
                Dashboard
              </Link>
              <Link to="/admin/products" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/admin/products') ? 'border-b-2 border-blue-500 text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                <PackageIcon size={16} className="mr-2" />
                Products
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={handleLogout} className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-slate-500 hover:text-slate-700">
              <LogOutIcon size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>;
};