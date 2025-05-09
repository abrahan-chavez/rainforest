import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminNav } from './AdminNav';
export const AdminLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin';
  if (isLoginPage) {
    return <Outlet />;
  }
  return <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>;
};