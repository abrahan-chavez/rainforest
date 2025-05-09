import React from 'react';
import { useStore } from '../../context/StoreContext';
import { LayoutDashboardIcon, PackageIcon, ShoppingCartIcon, TruckIcon } from 'lucide-react';
export const AdminDashboardPage = () => {
  const {
    products,
    orders
  } = useStore();
  const stats = [{
    name: 'Total Products',
    value: products.length,
    icon: PackageIcon,
    color: 'bg-blue-500'
  }, {
    name: 'Active Orders',
    value: orders.filter(o => o.status === 'mining').length,
    icon: ShoppingCartIcon,
    color: 'bg-amber-500'
  }, {
    name: 'Completed Orders',
    value: orders.filter(o => o.status === 'completed').length,
    icon: TruckIcon,
    color: 'bg-green-500'
  }];
  return <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(item => <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className={`h-6 w-6 text-white p-1 rounded-md ${item.color}`} aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-slate-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="text-lg font-semibold text-slate-900">
                      {item.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>)}
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-medium text-slate-900 mb-4">
          Recent Orders
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-slate-200">
            {orders.slice(0, 5).map(order => <li key={order.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-blue-600 truncate">
                      {order.id}
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'mining' ? 'bg-amber-100 text-amber-800' : order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="text-sm text-slate-500">
                        Progress: {order.progress}%
                      </p>
                    </div>
                  </div>
                </div>
              </li>)}
          </ul>
        </div>
      </div>
    </div>;
};