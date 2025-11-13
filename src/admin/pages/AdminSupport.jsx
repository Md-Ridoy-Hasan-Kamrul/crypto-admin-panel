import React, { useEffect, useState } from 'react';

// Mock support messages
const mockSupportMessages = {
  user1234567890: [
    {
      id: 1,
      uid: 'user1234567890',
      sender: 'user',
      message: 'I need help with my withdrawal',
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: 2,
      uid: 'user1234567890',
      sender: 'admin',
      message: 'Hello! I can help you with that. What seems to be the issue?',
      createdAt: new Date(Date.now() - 3000000), // 50 minutes ago
    },
  ],
  user0987654321: [
    {
      id: 3,
      uid: 'user0987654321',
      sender: 'user',
      message: 'My account balance is not updating',
      createdAt: new Date(Date.now() - 7200000), // 2 hours ago
    },
  ],
};

const AdminSupport = () => {
  const [messages, setMessages] = useState(mockSupportMessages);
  const [reply, setReply] = useState('');
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    // Initialize with mock data
    setMessages(mockSupportMessages);
  }, []);

  const handleSendReply = () => {
    if (!reply || !activeUser) return;

    const newMessage = {
      id: Date.now(),
      uid: activeUser,
      sender: 'admin',
      message: reply,
      createdAt: new Date(),
    };

    setMessages((prev) => ({
      ...prev,
      [activeUser]: [...(prev[activeUser] || []), newMessage],
    }));

    setReply('');
  };

  return (
    <div className='container mt-4'>
      <h3>Support Chat</h3>
      <div className='row'>
        {/* User list */}
        <div className='col-md-3'>
          <h5>Users</h5>
          <ul className='list-group'>
            {Object.keys(messages).map((uid) => (
              <li
                key={uid}
                className={`list-group-item ${
                  uid === activeUser ? 'active' : ''
                }`}
                onClick={() => setActiveUser(uid)}
                style={{ cursor: 'pointer' }}
              >
                {uid}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat window */}
        <div className='col-md-9'>
          {activeUser ? (
            <div>
              <h5>Chat with User: {activeUser}</h5>
              <div
                className='chat-box border p-3 mb-3'
                style={{
                  height: '400px',
                  overflowY: 'scroll',
                  backgroundColor: '#f9f9f9',
                }}
              >
                {messages[activeUser]?.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-2 text-${
                      msg.sender === 'admin' ? 'end' : 'start'
                    }`}
                  >
                    <span
                      className={`badge ${
                        msg.sender === 'admin' ? 'bg-primary' : 'bg-secondary'
                      }`}
                    >
                      {msg.sender}
                    </span>
                    <div>{msg.message}</div>
                    <small className='text-muted'>
                      {msg.createdAt?.toLocaleString()}
                    </small>
                  </div>
                ))}
              </div>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder='Type your reply...'
                />
                <button className='btn btn-success' onClick={handleSendReply}>
                  Send
                </button>
              </div>
            </div>
          ) : (
            <p>Select a user to view and reply to messages.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSupport;
