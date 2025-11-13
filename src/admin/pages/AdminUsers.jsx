import React, { useEffect, useState } from 'react';

// Mock user data for development with complete user profiles
const mockUsers = [
  {
    id: 'user1234567890',
    email: 'john@example.com',
    name: 'John Doe',
    phone: '+1234567890',
    balance: 1250.75,
    creditScore: 850,
    vipStatus: 'Gold',
    status: 'active',
    kycStatus: 'approved',
    kycUrl: 'https://via.placeholder.com/300x200?text=John+KYC+Document',
    joinDate: '2024-01-15',
    lastLogin: '2024-11-13',
    totalDeposits: 5000,
    totalWithdrawals: 3500,
    tradingVolume: 25000,
  },
  {
    id: 'user0987654321',
    email: 'jane@example.com',
    name: 'Jane Smith',
    phone: '+0987654321',
    balance: 890.25,
    creditScore: 720,
    vipStatus: 'Silver',
    status: 'active',
    kycStatus: 'pending',
    kycUrl: 'https://via.placeholder.com/300x200?text=Jane+KYC+Document',
    joinDate: '2024-02-20',
    lastLogin: '2024-11-12',
    totalDeposits: 2500,
    totalWithdrawals: 1800,
    tradingVolume: 15000,
  },
  {
    id: 'user1122334455',
    email: 'bob@example.com',
    name: 'Bob Johnson',
    phone: '+1122334455',
    balance: 0,
    creditScore: 650,
    vipStatus: 'Bronze',
    status: 'banned',
    kycStatus: 'rejected',
    kycUrl: 'https://via.placeholder.com/300x200?text=Bob+KYC+Document',
    joinDate: '2024-03-10',
    lastLogin: '2024-11-10',
    totalDeposits: 1000,
    totalWithdrawals: 1200,
    tradingVolume: 5000,
  },
  {
    id: 'user5566778899',
    email: 'alice@example.com',
    name: 'Alice Brown',
    phone: '+5566778899',
    balance: 3500.5,
    creditScore: 920,
    vipStatus: 'Platinum',
    status: 'active',
    kycStatus: 'approved',
    kycUrl: 'https://via.placeholder.com/300x200?text=Alice+KYC+Document',
    joinDate: '2023-12-01',
    lastLogin: '2024-11-13',
    totalDeposits: 15000,
    totalWithdrawals: 8000,
    tradingVolume: 50000,
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newBalance, setNewBalance] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    // Initialize with mock data
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.id.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (uid) => {
    navigator.clipboard.writeText(uid);
    alert('UID copied: ' + uid);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setNewBalance(user.balance || 0);
    setEditedUser({ ...user });
    setEditMode(false);
  };

  const openEditMode = () => {
    setEditMode(true);
  };

  const saveUserProfile = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...editedUser } : u))
    );
    setSelectedUser(editedUser);
    alert('User profile updated successfully!');
    setEditMode(false);
  };

  const updateVipStatus = (newVip) => {
    const updatedUser = { ...editedUser, vipStatus: newVip };
    setEditedUser(updatedUser);
  };

  const updateBalance = () => {
    if (selectedUser && !isNaN(newBalance)) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, balance: Number(newBalance) } : u
        )
      );
      alert('Balance updated!');
      setSelectedUser(null);
    }
  };

  const toggleBanStatus = () => {
    const newStatus = selectedUser.status === 'active' ? 'banned' : 'active';
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id ? { ...u, status: newStatus } : u
      )
    );
    alert(`User ${newStatus === 'banned' ? 'banned' : 'activated'}!`);
    setSelectedUser(null);
  };

  const approveKYC = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id ? { ...u, kycStatus: 'approved' } : u
      )
    );
    alert('KYC Approved');
    setSelectedUser(null);
  };

  const rejectKYC = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id ? { ...u, kycStatus: 'rejected' } : u
      )
    );
    alert('KYC Rejected');
    setSelectedUser(null);
  };

  return (
    <div>
      <h3 className='mb-3'>Registered Users</h3>
      <input
        className='form-control mb-3'
        placeholder='Search by UID or Email'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className='table table-bordered table-striped'>
        <thead className='table-dark'>
          <tr>
            <th>UID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Balance</th>
            <th>Credit Score</th>
            <th>VIP Status</th>
            <th>Status</th>
            <th>KYC</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <span
                  onClick={() => handleCopy(user.id)}
                  style={{ cursor: 'pointer', color: '#0d6efd' }}
                >
                  {user.id.slice(0, 10)}... 📋
                </span>
              </td>
              <td>{user.email || 'N/A'}</td>
              <td>{user.name || 'N/A'}</td>
              <td>${Number(user.balance || 0).toFixed(2)}</td>
              <td>
                <span
                  className={`badge ${
                    user.creditScore >= 800
                      ? 'bg-success'
                      : user.creditScore >= 700
                      ? 'bg-warning'
                      : 'bg-danger'
                  }`}
                >
                  {user.creditScore}
                </span>
              </td>
              <td>
                <span
                  className={`badge ${
                    user.vipStatus === 'Platinum'
                      ? 'bg-dark'
                      : user.vipStatus === 'Gold'
                      ? 'bg-warning'
                      : user.vipStatus === 'Silver'
                      ? 'bg-secondary'
                      : 'bg-info'
                  }`}
                >
                  {user.vipStatus}
                </span>
              </td>
              <td>
                <span
                  className={`badge ${
                    user.status === 'active' ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td>
                <span
                  className={`badge ${
                    user.kycStatus === 'approved'
                      ? 'bg-success'
                      : user.kycStatus === 'pending'
                      ? 'bg-warning'
                      : 'bg-danger'
                  }`}
                >
                  {user.kycStatus}
                </span>
              </td>
              <td>
                <button
                  className='btn btn-sm btn-primary me-2'
                  onClick={() => openModal(user)}
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Enhanced User Management Modal */}
      {selectedUser && (
        <div
          className='modal d-block'
          tabIndex='-1'
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <div className='modal-dialog modal-lg modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>
                  {editMode ? 'Edit User Profile' : 'Manage User'} -{' '}
                  {selectedUser.name}
                </h5>
                <button
                  className='btn-close'
                  onClick={() => setSelectedUser(null)}
                ></button>
              </div>
              <div className='modal-body'>
                {!editMode ? (
                  // View Mode
                  <div className='row'>
                    <div className='col-md-6'>
                      <h6>Basic Information</h6>
                      <p>
                        <strong>Email:</strong> {selectedUser.email}
                      </p>
                      <p>
                        <strong>Name:</strong> {selectedUser.name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {selectedUser.phone}
                      </p>
                      <p>
                        <strong>Join Date:</strong> {selectedUser.joinDate}
                      </p>
                      <p>
                        <strong>Last Login:</strong> {selectedUser.lastLogin}
                      </p>

                      <h6 className='mt-3'>Account Status</h6>
                      <p>
                        <strong>Status:</strong>
                        <span
                          className={`badge ms-2 ${
                            selectedUser.status === 'active'
                              ? 'bg-success'
                              : 'bg-danger'
                          }`}
                        >
                          {selectedUser.status}
                        </span>
                      </p>
                      <p>
                        <strong>VIP Status:</strong>
                        <span
                          className={`badge ms-2 ${
                            selectedUser.vipStatus === 'Platinum'
                              ? 'bg-dark'
                              : selectedUser.vipStatus === 'Gold'
                              ? 'bg-warning'
                              : selectedUser.vipStatus === 'Silver'
                              ? 'bg-secondary'
                              : 'bg-info'
                          }`}
                        >
                          {selectedUser.vipStatus}
                        </span>
                      </p>
                      <p>
                        <strong>Credit Score:</strong>
                        <span
                          className={`badge ms-2 ${
                            selectedUser.creditScore >= 800
                              ? 'bg-success'
                              : selectedUser.creditScore >= 700
                              ? 'bg-warning'
                              : 'bg-danger'
                          }`}
                        >
                          {selectedUser.creditScore}
                        </span>
                      </p>
                    </div>

                    <div className='col-md-6'>
                      <h6>Financial Summary</h6>
                      <p>
                        <strong>Current Balance:</strong> $
                        {selectedUser.balance?.toFixed(2)}
                      </p>
                      <p>
                        <strong>Total Deposits:</strong> $
                        {selectedUser.totalDeposits?.toFixed(2)}
                      </p>
                      <p>
                        <strong>Total Withdrawals:</strong> $
                        {selectedUser.totalWithdrawals?.toFixed(2)}
                      </p>
                      <p>
                        <strong>Trading Volume:</strong> $
                        {selectedUser.tradingVolume?.toFixed(2)}
                      </p>

                      <div className='mb-3 mt-3'>
                        <label className='form-label'>Update Balance ($)</label>
                        <input
                          type='number'
                          className='form-control'
                          value={newBalance}
                          onChange={(e) => setNewBalance(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Edit Mode
                  <div className='row'>
                    <div className='col-md-6'>
                      <h6>Edit Profile Information</h6>
                      <div className='mb-3'>
                        <label className='form-label'>Name</label>
                        <input
                          type='text'
                          className='form-control'
                          value={editedUser.name}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input
                          type='email'
                          className='form-control'
                          value={editedUser.email}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className='mb-3'>
                        <label className='form-label'>Phone</label>
                        <input
                          type='text'
                          className='form-control'
                          value={editedUser.phone}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className='mb-3'>
                        <label className='form-label'>Credit Score</label>
                        <input
                          type='number'
                          className='form-control'
                          value={editedUser.creditScore}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              creditScore: parseInt(e.target.value),
                            })
                          }
                          min='300'
                          max='850'
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <h6>VIP Status & Settings</h6>
                      <div className='mb-3'>
                        <label className='form-label'>VIP Status</label>
                        <select
                          className='form-select'
                          value={editedUser.vipStatus}
                          onChange={(e) => updateVipStatus(e.target.value)}
                        >
                          <option value='Bronze'>Bronze</option>
                          <option value='Silver'>Silver</option>
                          <option value='Gold'>Gold</option>
                          <option value='Platinum'>Platinum</option>
                        </select>
                      </div>

                      <div className='mb-3'>
                        <label className='form-label'>Total Deposits</label>
                        <input
                          type='number'
                          className='form-control'
                          value={editedUser.totalDeposits}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              totalDeposits: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className='mb-3'>
                        <label className='form-label'>Total Withdrawals</label>
                        <input
                          type='number'
                          className='form-control'
                          value={editedUser.totalWithdrawals}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              totalWithdrawals: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className='mb-3'>
                        <label className='form-label'>Trading Volume</label>
                        <input
                          type='number'
                          className='form-control'
                          value={editedUser.tradingVolume}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              tradingVolume: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* KYC Section */}
                {selectedUser.kycUrl && (
                  <div className='mt-4'>
                    <h6>KYC Document</h6>
                    <img
                      src={selectedUser.kycUrl}
                      alt='KYC Document'
                      className='img-fluid mb-3'
                      style={{ maxHeight: '200px' }}
                    />
                    <div>
                      <button
                        className='btn btn-success btn-sm me-2'
                        onClick={approveKYC}
                      >
                        ✓ Approve KYC
                      </button>
                      <button
                        className='btn btn-danger btn-sm'
                        onClick={rejectKYC}
                      >
                        ✗ Reject KYC
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className='modal-footer'>
                <button
                  className='btn btn-secondary'
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </button>

                {!editMode ? (
                  <>
                    <button
                      className='btn btn-info me-2'
                      onClick={openEditMode}
                    >
                      ✏️ Edit Profile
                    </button>
                    <button
                      className='btn btn-danger me-2'
                      onClick={toggleBanStatus}
                    >
                      {selectedUser.status === 'active'
                        ? '🚫 Ban User'
                        : '✅ Activate User'}
                    </button>
                    <button className='btn btn-success' onClick={updateBalance}>
                      💰 Update Balance
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className='btn btn-secondary me-2'
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className='btn btn-primary'
                      onClick={saveUserProfile}
                    >
                      💾 Save Changes
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
