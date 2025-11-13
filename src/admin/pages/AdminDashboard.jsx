import React from 'react';

const AdminDashboard = () => {
  // Mock dashboard statistics
  const stats = {
    totalUsers: 156,
    activeUsers: 89,
    totalTrades: 2341,
    totalBalance: 45678.9,
  };

  return (
    <div className='container py-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2>Admin Dashboard</h2>
      </div>

      {/* Statistics Cards */}
      <div className='row mb-4'>
        <div className='col-md-3'>
          <div className='card text-center bg-primary text-white'>
            <div className='card-body'>
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card text-center bg-success text-white'>
            <div className='card-body'>
              <h3>{stats.activeUsers}</h3>
              <p>Active Users</p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card text-center bg-info text-white'>
            <div className='card-body'>
              <h3>{stats.totalTrades}</h3>
              <p>Total Trades</p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card text-center bg-warning text-white'>
            <div className='card-body'>
              <h3>${stats.totalBalance.toFixed(2)}</h3>
              <p>Total Balance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Card */}
      <div className='card p-4 shadow-sm'>
        <h5>Welcome to Crypto Admin Panel!</h5>
        <p>
          Manage users, control trades, and monitor your platform from this
          dashboard.
        </p>
        <hr />
        <div className='row'>
          <div className='col-md-6'>
            <h6>Quick Actions:</h6>
            <ul>
              <li>View and manage registered users</li>
              <li>Control trade outcomes</li>
              <li>Handle support requests</li>
              <li>Configure wallet settings</li>
            </ul>
          </div>
          <div className='col-md-6'>
            <h6>Recent Activity:</h6>
            <ul>
              <li>15 new users registered today</li>
              <li>234 trades executed</li>
              <li>5 support tickets pending</li>
              <li>All systems operational</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
