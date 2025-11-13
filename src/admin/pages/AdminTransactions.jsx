import React, { useState, useEffect } from 'react';

// Mock transaction data
const mockTransactions = [
  {
    id: 'txn001',
    userId: 'user1234567890',
    userName: 'John Doe',
    type: 'deposit',
    amount: 1500.0,
    currency: 'USDT',
    status: 'pending',
    method: 'TRC20',
    walletAddress: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5oQHR7E',
    date: '2024-11-13 10:30',
    txHash: '0x1a2b3c4d5e6f...',
    fee: 1.0,
  },
  {
    id: 'txn002',
    userId: 'user0987654321',
    userName: 'Jane Smith',
    type: 'withdrawal',
    amount: 800.0,
    currency: 'BTC',
    status: 'completed',
    method: 'Bitcoin Network',
    walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    date: '2024-11-12 15:45',
    txHash: '0x9f8e7d6c5b4a...',
    fee: 0.0005,
  },
  {
    id: 'txn003',
    userId: 'user5566778899',
    userName: 'Alice Brown',
    type: 'exchange',
    amount: 2000.0,
    currency: 'ETH to USDT',
    status: 'completed',
    method: 'Internal Exchange',
    walletAddress: 'Internal',
    date: '2024-11-11 09:20',
    txHash: 'exchange_internal',
    fee: 10.0,
  },
  {
    id: 'txn004',
    userId: 'user1122334455',
    userName: 'Bob Johnson',
    type: 'deposit',
    amount: 500.0,
    currency: 'ETH',
    status: 'rejected',
    method: 'ERC20',
    walletAddress: '0x742d35Cc6754C0532925a3b8D0C2d0E8b9c1a8e7',
    date: '2024-11-10 14:10',
    txHash: '0x5a4b3c2d1e0f...',
    fee: 0.001,
  },
];

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTransactions(mockTransactions);
  }, []);

  const filteredTransactions = transactions.filter((txn) => {
    const matchesType = filterType === 'all' || txn.type === filterType;
    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus;
    const matchesSearch =
      txn.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.currency.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
  });

  const updateTransactionStatus = (newStatus) => {
    setTransactions((prev) =>
      prev.map((txn) =>
        txn.id === selectedTransaction.id ? { ...txn, status: newStatus } : txn
      )
    );

    setSelectedTransaction((prev) => ({ ...prev, status: newStatus }));
    alert(`Transaction ${newStatus} successfully!`);
  };

  const getTotalByType = (type) => {
    return transactions
      .filter((txn) => txn.type === type && txn.status === 'completed')
      .reduce((sum, txn) => sum + txn.amount, 0);
  };

  const getPendingCount = () => {
    return transactions.filter((txn) => txn.status === 'pending').length;
  };

  return (
    <div className='container mt-4'>
      <h3>Transaction Management</h3>

      {/* Statistics Cards */}
      <div className='row mb-4'>
        <div className='col-md-3'>
          <div className='card bg-primary text-white text-center'>
            <div className='card-body'>
              <h4>${getTotalByType('deposit').toFixed(2)}</h4>
              <p>Total Deposits</p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card bg-danger text-white text-center'>
            <div className='card-body'>
              <h4>${getTotalByType('withdrawal').toFixed(2)}</h4>
              <p>Total Withdrawals</p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card bg-info text-white text-center'>
            <div className='card-body'>
              <h4>${getTotalByType('exchange').toFixed(2)}</h4>
              <p>Total Exchanges</p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card bg-warning text-white text-center'>
            <div className='card-body'>
              <h4>{getPendingCount()}</h4>
              <p>Pending Requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='row mb-3'>
        <div className='col-md-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search transactions...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='col-md-3'>
          <select
            className='form-select'
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value='all'>All Types</option>
            <option value='deposit'>Deposits</option>
            <option value='withdrawal'>Withdrawals</option>
            <option value='exchange'>Exchanges</option>
          </select>
        </div>
        <div className='col-md-3'>
          <select
            className='form-select'
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value='all'>All Status</option>
            <option value='pending'>Pending</option>
            <option value='completed'>Completed</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className='table-responsive'>
        <table className='table table-bordered table-striped'>
          <thead className='table-dark'>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn) => (
              <tr key={txn.id}>
                <td>
                  <span
                    style={{ cursor: 'pointer', color: '#0d6efd' }}
                    onClick={() => navigator.clipboard.writeText(txn.id)}
                  >
                    {txn.id} 📋
                  </span>
                </td>
                <td>{txn.userName}</td>
                <td>
                  <span
                    className={`badge ${
                      txn.type === 'deposit'
                        ? 'bg-success'
                        : txn.type === 'withdrawal'
                        ? 'bg-danger'
                        : 'bg-info'
                    }`}
                  >
                    {txn.type}
                  </span>
                </td>
                <td>${txn.amount.toFixed(2)}</td>
                <td>{txn.currency}</td>
                <td>{txn.method}</td>
                <td>
                  <span
                    className={`badge ${
                      txn.status === 'completed'
                        ? 'bg-success'
                        : txn.status === 'pending'
                        ? 'bg-warning'
                        : 'bg-danger'
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td>{txn.date}</td>
                <td>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={() => setSelectedTransaction(txn)}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div
          className='modal d-block'
          tabIndex='-1'
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <div className='modal-dialog modal-lg modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>
                  Transaction Details - {selectedTransaction.id}
                </h5>
                <button
                  className='btn-close'
                  onClick={() => setSelectedTransaction(null)}
                ></button>
              </div>
              <div className='modal-body'>
                <div className='row'>
                  <div className='col-md-6'>
                    <h6>Transaction Information</h6>
                    <p>
                      <strong>ID:</strong> {selectedTransaction.id}
                    </p>
                    <p>
                      <strong>User:</strong> {selectedTransaction.userName}
                    </p>
                    <p>
                      <strong>User ID:</strong> {selectedTransaction.userId}
                    </p>
                    <p>
                      <strong>Type:</strong>
                      <span
                        className={`badge ms-2 ${
                          selectedTransaction.type === 'deposit'
                            ? 'bg-success'
                            : selectedTransaction.type === 'withdrawal'
                            ? 'bg-danger'
                            : 'bg-info'
                        }`}
                      >
                        {selectedTransaction.type}
                      </span>
                    </p>
                    <p>
                      <strong>Amount:</strong> $
                      {selectedTransaction.amount.toFixed(2)}
                    </p>
                    <p>
                      <strong>Currency:</strong> {selectedTransaction.currency}
                    </p>
                    <p>
                      <strong>Fee:</strong> ${selectedTransaction.fee}
                    </p>
                  </div>
                  <div className='col-md-6'>
                    <h6>Technical Details</h6>
                    <p>
                      <strong>Method:</strong> {selectedTransaction.method}
                    </p>
                    <p>
                      <strong>Wallet Address:</strong>
                    </p>
                    <code className='d-block p-2 bg-light rounded'>
                      {selectedTransaction.walletAddress}
                    </code>
                    <p>
                      <strong>Transaction Hash:</strong>
                    </p>
                    <code className='d-block p-2 bg-light rounded'>
                      {selectedTransaction.txHash}
                    </code>
                    <p>
                      <strong>Date:</strong> {selectedTransaction.date}
                    </p>
                    <p>
                      <strong>Status:</strong>
                      <span
                        className={`badge ms-2 ${
                          selectedTransaction.status === 'completed'
                            ? 'bg-success'
                            : selectedTransaction.status === 'pending'
                            ? 'bg-warning'
                            : 'bg-danger'
                        }`}
                      >
                        {selectedTransaction.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  className='btn btn-secondary'
                  onClick={() => setSelectedTransaction(null)}
                >
                  Close
                </button>
                {selectedTransaction.status === 'pending' && (
                  <>
                    <button
                      className='btn btn-success me-2'
                      onClick={() => updateTransactionStatus('completed')}
                    >
                      ✅ Approve
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => updateTransactionStatus('rejected')}
                    >
                      ❌ Reject
                    </button>
                  </>
                )}
                {selectedTransaction.status === 'rejected' && (
                  <button
                    className='btn btn-success'
                    onClick={() => updateTransactionStatus('completed')}
                  >
                    ✅ Approve Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;
