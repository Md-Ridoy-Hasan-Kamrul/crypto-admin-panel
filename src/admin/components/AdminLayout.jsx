import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  return (
    <div className='d-flex' style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className='bg-dark text-white p-3' style={{ width: '250px' }}>
        <h4 className='text-center mb-4'>Admin Panel</h4>
        <ul className='nav flex-column gap-2'>
          <li>
            <Link to='/admin/dashboard' className='nav-link text-white'>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to='/admin/users' className='nav-link text-white'>
              Users
            </Link>
          </li>
          <li>
            <Link to='/admin/transactions' className='nav-link text-white'>
              Transactions
            </Link>
          </li>
          <li>
            <Link to='/admin/trade-control' className='nav-link text-white'>
              Trade Control
            </Link>
          </li>
          <li>
            <Link to='/admin/wallets' className='nav-link text-white'>
              Wallet Settings
            </Link>
          </li>
          <li>
            <Link to='/admin/content' className='nav-link text-white'>
              Content Management
            </Link>
          </li>
          <li>
            <Link to='/admin/access' className='nav-link text-white'>
              Access Control
            </Link>
          </li>
          <li>
            <Link to='/admin/support' className='nav-link text-white'>
              Support
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className='flex-grow-1 p-4'>
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <h2>Admin</h2>
          <button className='btn btn-outline-danger' onClick={handleLogout}>
            Logout
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
