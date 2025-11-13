import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import AdminLogin from './admin/pages/AdminLogin';
import AdminLayout from './admin/components/AdminLayout';

import AdminDashboard from './admin/pages/AdminDashboard';
import AdminUsers from './admin/pages/AdminUsers';
import AdminTransactions from './admin/pages/AdminTransactions';
import AdminTradeControl from './admin/pages/AdminTradeControl';
import AdminAccessControl from './admin/pages/AdminAccessControl';
import AdminWalletSettings from './admin/pages/AdminWalletSettings';
import AdminContentManagement from './admin/pages/AdminContentManagement';
import AdminSupport from './admin/pages/AdminSupport';

const isAuthenticated = !!localStorage.getItem('isAdminLoggedIn');

function App() {
  return (
    <Router>
      <Routes>
        {/* Root redirect to admin */}
        <Route path='/' element={<Navigate to='/admin' replace />} />

        {/* Admin redirect based on authentication */}
        <Route
          path='/admin'
          element={
            isAuthenticated ? (
              <Navigate to='/admin/dashboard' replace />
            ) : (
              <Navigate to='/admin/login' replace />
            )
          }
        />

        {/* Admin login page */}
        <Route path='/admin/login' element={<AdminLogin />} />

        {/* Protected Admin layout for nested pages */}
        <Route path='/admin/*' element={<AdminLayout />}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='transactions' element={<AdminTransactions />} />
          <Route path='trade-control' element={<AdminTradeControl />} />
          <Route path='access' element={<AdminAccessControl />} />
          <Route path='wallets' element={<AdminWalletSettings />} />
          <Route path='content' element={<AdminContentManagement />} />
          <Route path='support' element={<AdminSupport />} />
        </Route>

        {/* Catch-all route for unmatched paths */}
        <Route path='*' element={<Navigate to='/admin' replace />} />
      </Routes>
    </Router>
  );
}

export default App;
