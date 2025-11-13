import React, { useState } from 'react';

const AdminWalletSettings = () => {
  const [wallets, setWallets] = useState({
    trcWallet: localStorage.getItem('trcWallet') || '',
    ercWallet: localStorage.getItem('ercWallet') || '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (field, value) => {
    setWallets((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveWalletSettings = () => {
    try {
      localStorage.setItem('trcWallet', wallets.trcWallet);
      localStorage.setItem('ercWallet', wallets.ercWallet);
      setMessage('Wallet addresses updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update wallet addresses');
    }
  };

  return (
    <div className='container mt-4'>
      <h3>Wallet Settings</h3>

      {message && (
        <div className='alert alert-success alert-dismissible'>{message}</div>
      )}

      <div className='row'>
        <div className='col-md-8'>
          <div className='card'>
            <div className='card-header'>
              <h5>Update Wallet Addresses</h5>
            </div>
            <div className='card-body'>
              <div className='mb-3'>
                <label className='form-label'>
                  <strong>TRC20 Wallet Address (Tron Network)</strong>
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={wallets.trcWallet}
                  onChange={(e) =>
                    handleInputChange('trcWallet', e.target.value)
                  }
                  placeholder='Enter TRC20 wallet address'
                />
                <small className='text-muted'>
                  This address will be used for USDT TRC20, TRX and other
                  Tron-based tokens
                </small>
              </div>

              <div className='mb-3'>
                <label className='form-label'>
                  <strong>ERC20 Wallet Address (Ethereum Network)</strong>
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={wallets.ercWallet}
                  onChange={(e) =>
                    handleInputChange('ercWallet', e.target.value)
                  }
                  placeholder='Enter ERC20 wallet address'
                />
                <small className='text-muted'>
                  This address will be used for USDT ERC20, ETH, USDC and other
                  Ethereum-based tokens
                </small>
              </div>

              <button className='btn btn-primary' onClick={saveWalletSettings}>
                Save Wallet Settings
              </button>
            </div>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='card'>
            <div className='card-header'>
              <h5>Current Settings</h5>
            </div>
            <div className='card-body'>
              <div className='mb-3'>
                <strong>TRC20 Address:</strong>
                <p className='small text-break'>
                  {wallets.trcWallet || 'Not set'}
                </p>
              </div>
              <div className='mb-3'>
                <strong>ERC20 Address:</strong>
                <p className='small text-break'>
                  {wallets.ercWallet || 'Not set'}
                </p>
              </div>
              <div className='alert alert-info small'>
                <strong>Note:</strong> These wallet addresses will be shown to
                users for deposits.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWalletSettings;
