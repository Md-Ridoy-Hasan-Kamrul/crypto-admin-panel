import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Simple admin credentials (for development)
  const ADMIN_EMAIL = 'admin@crypto.com';
  const ADMIN_PASSWORD = 'admin123';

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple credential check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('adminEmail', email);
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center min-vh-100 bg-dark'>
      <div className='card shadow-lg p-4 w-100' style={{ maxWidth: '400px' }}>
        <h2 className='text-center text-primary mb-4'>Admin Login</h2>

        {error && <div className='alert alert-danger'>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label text-white'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='admin@crypto.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='password' className='form-label text-white'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='admin123'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type='submit' className='btn btn-primary w-100 mb-3'>
            Log In
          </button>
        </form>

        <div className='text-center'>
          <div className='alert alert-info'>
            <strong>Admin Credentials:</strong>
            <br />
            Email: admin@crypto.com
            <br />
            Password: admin123
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
