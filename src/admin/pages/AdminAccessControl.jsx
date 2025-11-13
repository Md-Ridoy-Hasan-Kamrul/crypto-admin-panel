import React, { useEffect, useState } from 'react';

// Mock admin/staff users
const mockAdminUsers = [
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@crypto.com',
    role: 'admin',
    permissions: {
      canViewUsers: true,
      canBanUsers: true,
      canAccessSupport: true,
      canAccessKYC: true,
      canControlTrades: true,
      canViewTradeHistory: true,
      canAccessWalletSettings: true,
    },
  },
  {
    id: 'support1',
    name: 'Support Staff',
    email: 'support@crypto.com',
    role: 'support',
    permissions: {
      canViewUsers: true,
      canAccessSupport: true,
      canAccessKYC: true,
    },
  },
];

const AdminAccessControl = () => {
  const [users, setUsers] = useState(mockAdminUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [permissions, setPermissions] = useState({});
  const [role, setRole] = useState('support');

  useEffect(() => {
    setUsers(mockAdminUsers);
  }, []);

  const openUser = (user) => {
    setSelectedUser(user);
    setRole(user.role || 'support');
    setPermissions(user.permissions || {});
  };

  const togglePermission = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const savePermissions = () => {
    if (!selectedUser) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id ? { ...user, role, permissions } : user
      )
    );

    alert('Permissions updated successfully.');
    setSelectedUser(null);
  };

  const PERMISSION_LIST = [
    { key: 'canViewUsers', label: 'View Users' },
    { key: 'canBanUsers', label: 'Ban/Activate Users' },
    { key: 'canAccessSupport', label: 'Access Support Page' },
    { key: 'canAccessKYC', label: 'Approve/Reject KYC' },
    { key: 'canControlTrades', label: 'Control Trade Results' },
    { key: 'canViewTradeHistory', label: 'View Trade History' },
    { key: 'canAccessWalletSettings', label: 'Access Wallet Settings' },
  ];

  return (
    <div className='container mt-4'>
      <h3>Admin Access Control</h3>
      <p>Assign permissions to support/admin staff.</p>

      <table className='table table-bordered table-striped'>
        <thead className='table-dark'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((u) => u.role !== 'user')
            .map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={() => openUser(user)}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedUser && (
        <div
          className='modal d-block'
          tabIndex='-1'
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>
                  Edit Access for {selectedUser.name}
                </h5>
                <button
                  className='btn-close'
                  onClick={() => setSelectedUser(null)}
                ></button>
              </div>
              <div className='modal-body'>
                <div className='mb-3'>
                  <label className='form-label'>Role</label>
                  <select
                    className='form-select'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value='support'>Support</option>
                    <option value='manager'>Manager</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>

                <h6>Permissions:</h6>
                {PERMISSION_LIST.map(({ key, label }) => (
                  <div className='form-check' key={key}>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={key}
                      checked={permissions[key] || false}
                      onChange={() => togglePermission(key)}
                    />
                    <label className='form-check-label' htmlFor={key}>
                      {label}
                    </label>
                  </div>
                ))}
              </div>
              <div className='modal-footer'>
                <button
                  className='btn btn-secondary'
                  onClick={() => setSelectedUser(null)}
                >
                  Cancel
                </button>
                <button className='btn btn-success' onClick={savePermissions}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccessControl;
