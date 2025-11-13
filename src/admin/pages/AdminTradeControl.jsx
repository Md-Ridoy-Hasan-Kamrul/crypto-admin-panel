import React, { useState } from 'react';

// Mock user data for trade control with enhanced features
const mockTradeUsers = {
  user1234567890: {
    email: 'john@example.com',
    name: 'John Doe',
    tradeMode: 'random',
    winRate: 65,
    totalTrades: 150,
    winStreak: 3,
    lossStreak: 0,
    lastTradeResult: 'win',
    tradingBalance: 1250.75,
    profitLoss: +320.5,
  },
  user0987654321: {
    email: 'jane@example.com',
    name: 'Jane Smith',
    tradeMode: 'always_win',
    winRate: 95,
    totalTrades: 89,
    winStreak: 12,
    lossStreak: 0,
    lastTradeResult: 'win',
    tradingBalance: 890.25,
    profitLoss: +890.25,
  },
  user1122334455: {
    email: 'bob@example.com',
    name: 'Bob Johnson',
    tradeMode: 'always_lose',
    winRate: 15,
    totalTrades: 67,
    winStreak: 0,
    lossStreak: 8,
    lastTradeResult: 'loss',
    tradingBalance: 45.0,
    profitLoss: -955.0,
  },
  user5566778899: {
    email: 'alice@example.com',
    name: 'Alice Brown',
    tradeMode: 'custom',
    winRate: 78,
    totalTrades: 234,
    winStreak: 5,
    lossStreak: 0,
    lastTradeResult: 'win',
    tradingBalance: 3500.5,
    profitLoss: +2850.75,
  },
};

const AdminTradeControl = () => {
  const [uid, setUid] = useState('');
  const [userData, setUserData] = useState(null);
  const [tradeMode, setTradeMode] = useState('');
  const [customWinRate, setCustomWinRate] = useState(50);
  const [message, setMessage] = useState('');
  const [userDatabase, setUserDatabase] = useState(mockTradeUsers);
  const [showAllUsers, setShowAllUsers] = useState(false);

  const fetchUser = () => {
    try {
      const user = userDatabase[uid];
      if (user) {
        setUserData(user);
        setTradeMode(user.tradeMode || 'random');
        setCustomWinRate(user.customWinRate || 50);
        setMessage('');
      } else {
        setUserData(null);
        setMessage(
          'User not found. Try: user1234567890, user0987654321, user1122334455, or user5566778899'
        );
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setMessage('Error fetching user.');
    }
  };

  const updateTradeMode = () => {
    try {
      setUserDatabase((prev) => ({
        ...prev,
        [uid]: {
          ...prev[uid],
          tradeMode,
          customWinRate: tradeMode === 'custom' ? customWinRate : undefined,
        },
      }));
      setMessage('Trade mode updated successfully.');
    } catch (error) {
      console.error('Error updating trade mode:', error);
      setMessage('Failed to update trade mode.');
    }
  };

  const simulateTrade = (result) => {
    if (!userData) return;

    const updatedUser = { ...userData };
    updatedUser.totalTrades += 1;
    updatedUser.lastTradeResult = result;

    if (result === 'win') {
      updatedUser.winStreak += 1;
      updatedUser.lossStreak = 0;
      updatedUser.profitLoss += 50; // Assuming $50 profit per win
      updatedUser.tradingBalance += 50;
    } else {
      updatedUser.lossStreak += 1;
      updatedUser.winStreak = 0;
      updatedUser.profitLoss -= 50; // Assuming $50 loss per loss
      updatedUser.tradingBalance -= 50;
    }

    // Recalculate win rate
    const totalWins =
      Math.round((userData.winRate / 100) * userData.totalTrades) +
      (result === 'win' ? 1 : 0);
    updatedUser.winRate = Math.round(
      (totalWins / updatedUser.totalTrades) * 100
    );

    setUserDatabase((prev) => ({
      ...prev,
      [uid]: updatedUser,
    }));

    setUserData(updatedUser);
    alert(`Trade simulated: ${result.toUpperCase()}!`);
  };

  return (
    <div className='container mt-4'>
      <h3>Advanced Trade Control</h3>

      {/* Quick Stats */}
      <div className='row mb-4'>
        <div className='col-md-3'>
          <div className='card bg-primary text-white text-center'>
            <div className='card-body'>
              <h4>{Object.keys(userDatabase).length}</h4>
              <p>Total Traders</p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card bg-success text-white text-center'>
            <div className='card-body'>
              <h4>
                {
                  Object.values(userDatabase).filter(
                    (u) => u.tradeMode === 'always_win'
                  ).length
                }
              </h4>
              <p>Always Win Mode</p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card bg-danger text-white text-center'>
            <div className='card-body'>
              <h4>
                {
                  Object.values(userDatabase).filter(
                    (u) => u.tradeMode === 'always_lose'
                  ).length
                }
              </h4>
              <p>Always Lose Mode</p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card bg-warning text-white text-center'>
            <div className='card-body'>
              <h4>
                {
                  Object.values(userDatabase).filter(
                    (u) => u.tradeMode === 'custom'
                  ).length
                }
              </h4>
              <p>Custom Mode</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle View */}
      <div className='mb-3'>
        <button
          className={`btn ${
            !showAllUsers ? 'btn-primary' : 'btn-outline-primary'
          } me-2`}
          onClick={() => setShowAllUsers(false)}
        >
          Individual Control
        </button>
        <button
          className={`btn ${
            showAllUsers ? 'btn-primary' : 'btn-outline-primary'
          }`}
          onClick={() => setShowAllUsers(true)}
        >
          All Users Overview
        </button>
      </div>

      {!showAllUsers ? (
        // Individual User Control
        <>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter User UID'
              value={uid}
              onChange={(e) => setUid(e.target.value)}
            />
            <button className='btn btn-primary mt-2 me-2' onClick={fetchUser}>
              Fetch User
            </button>

            {/* Quick access buttons */}
            <div className='mt-2'>
              <small className='text-muted'>Quick access:</small>
              <br />
              <button
                className='btn btn-sm btn-outline-secondary me-2'
                onClick={() => setUid('user1234567890')}
              >
                John Doe
              </button>
              <button
                className='btn btn-sm btn-outline-secondary me-2'
                onClick={() => setUid('user0987654321')}
              >
                Jane Smith
              </button>
              <button
                className='btn btn-sm btn-outline-secondary me-2'
                onClick={() => setUid('user1122334455')}
              >
                Bob Johnson
              </button>
              <button
                className='btn btn-sm btn-outline-secondary'
                onClick={() => setUid('user5566778899')}
              >
                Alice Brown
              </button>
            </div>
          </div>

          {message && <div className='alert alert-info'>{message}</div>}

          {userData && (
            <div className='row'>
              {/* User Info Card */}
              <div className='col-md-6'>
                <div className='card p-3'>
                  <h5>User Trading Profile</h5>
                  <div className='row'>
                    <div className='col-6'>
                      <p>
                        <strong>Email:</strong> {userData.email}
                      </p>
                      <p>
                        <strong>Name:</strong> {userData.name}
                      </p>
                      <p>
                        <strong>Total Trades:</strong> {userData.totalTrades}
                      </p>
                      <p>
                        <strong>Win Rate:</strong>
                        <span
                          className={`badge ms-2 ${
                            userData.winRate >= 70
                              ? 'bg-success'
                              : userData.winRate >= 50
                              ? 'bg-warning'
                              : 'bg-danger'
                          }`}
                        >
                          {userData.winRate}%
                        </span>
                      </p>
                    </div>
                    <div className='col-6'>
                      <p>
                        <strong>Trading Balance:</strong> $
                        {userData.tradingBalance?.toFixed(2)}
                      </p>
                      <p>
                        <strong>P&L:</strong>
                        <span
                          className={`badge ms-2 ${
                            userData.profitLoss >= 0
                              ? 'bg-success'
                              : 'bg-danger'
                          }`}
                        >
                          ${userData.profitLoss?.toFixed(2)}
                        </span>
                      </p>
                      <p>
                        <strong>Win Streak:</strong> {userData.winStreak}
                      </p>
                      <p>
                        <strong>Loss Streak:</strong> {userData.lossStreak}
                      </p>
                    </div>
                  </div>

                  {/* Simulate Trade Buttons */}
                  <div className='mt-3'>
                    <h6>Simulate Next Trade:</h6>
                    <button
                      className='btn btn-success btn-sm me-2'
                      onClick={() => simulateTrade('win')}
                    >
                      📈 Force Win
                    </button>
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => simulateTrade('loss')}
                    >
                      📉 Force Loss
                    </button>
                  </div>
                </div>
              </div>

              {/* Trade Control Card */}
              <div className='col-md-6'>
                <div className='card p-3'>
                  <h6>Set Trade Outcome Mode:</h6>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='tradeMode'
                      value='always_win'
                      checked={tradeMode === 'always_win'}
                      onChange={() => setTradeMode('always_win')}
                    />
                    <label className='form-check-label'>
                      Always Win (100% Win Rate)
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='tradeMode'
                      value='always_lose'
                      checked={tradeMode === 'always_lose'}
                      onChange={() => setTradeMode('always_lose')}
                    />
                    <label className='form-check-label'>
                      Always Lose (0% Win Rate)
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='tradeMode'
                      value='random'
                      checked={tradeMode === 'random'}
                      onChange={() => setTradeMode('random')}
                    />
                    <label className='form-check-label'>
                      Random (Default ~50%)
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='tradeMode'
                      value='custom'
                      checked={tradeMode === 'custom'}
                      onChange={() => setTradeMode('custom')}
                    />
                    <label className='form-check-label'>Custom Win Rate</label>
                  </div>

                  {tradeMode === 'custom' && (
                    <div className='mt-3'>
                      <label className='form-label'>
                        Custom Win Rate: {customWinRate}%
                      </label>
                      <input
                        type='range'
                        className='form-range'
                        min='0'
                        max='100'
                        value={customWinRate}
                        onChange={(e) =>
                          setCustomWinRate(parseInt(e.target.value))
                        }
                      />
                      <div className='d-flex justify-content-between'>
                        <small>0%</small>
                        <small>50%</small>
                        <small>100%</small>
                      </div>
                    </div>
                  )}

                  <button
                    className='btn btn-success mt-3'
                    onClick={updateTradeMode}
                  >
                    💾 Save Mode
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        // All Users Overview
        <div className='card p-3'>
          <h5>All Traders Overview</h5>
          <div className='table-responsive'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Trade Mode</th>
                  <th>Win Rate</th>
                  <th>Total Trades</th>
                  <th>Balance</th>
                  <th>P&L</th>
                  <th>Quick Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(userDatabase).map(([userId, user]) => (
                  <tr key={userId}>
                    <td>
                      <strong>{user.name}</strong>
                      <br />
                      <small className='text-muted'>
                        {userId.slice(0, 10)}...
                      </small>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.tradeMode === 'always_win'
                            ? 'bg-success'
                            : user.tradeMode === 'always_lose'
                            ? 'bg-danger'
                            : user.tradeMode === 'custom'
                            ? 'bg-warning'
                            : 'bg-secondary'
                        }`}
                      >
                        {user.tradeMode}
                        {user.tradeMode === 'custom' &&
                          ` (${user.customWinRate}%)`}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.winRate >= 70
                            ? 'bg-success'
                            : user.winRate >= 50
                            ? 'bg-warning'
                            : 'bg-danger'
                        }`}
                      >
                        {user.winRate}%
                      </span>
                    </td>
                    <td>{user.totalTrades}</td>
                    <td>${user.tradingBalance?.toFixed(2)}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.profitLoss >= 0 ? 'bg-success' : 'bg-danger'
                        }`}
                      >
                        ${user.profitLoss?.toFixed(2)}
                      </span>
                    </td>
                    <td>
                      <button
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                          setUid(userId);
                          setShowAllUsers(false);
                          fetchUser();
                        }}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTradeControl;
