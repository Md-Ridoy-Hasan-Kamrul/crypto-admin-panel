import React, { useState, useEffect } from 'react';

const mockContentData = {
  general: {
    siteName: 'CryptoTrader Pro',
    siteDescription: 'Professional Cryptocurrency Trading Platform',
    supportEmail: 'support@cryptotrader.com',
    supportPhone: '+1-800-CRYPTO-1',
    maintenanceMode: false,
    registrationEnabled: true,
  },
  homepage: {
    heroTitle: 'Trade Crypto Like a Pro',
    heroSubtitle: 'Join thousands of traders worldwide',
    heroButtonText: 'Start Trading Now',
  },
  trading: {
    minTradeAmount: 10,
    maxTradeAmount: 10000,
    defaultTradeAmount: 100,
    payoutPercentage: 85,
  },
};

const AdminContentManagement = () => {
  const [content, setContent] = useState(mockContentData);
  const [activeSection, setActiveSection] = useState('general');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setContent(mockContentData);
  }, []);

  const handleContentChange = (section, field, value) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const saveSection = () => {
    try {
      localStorage.setItem('contentData', JSON.stringify(content));
      setMessage('Content saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to save content.');
    }
  };

  const sections = [
    { id: 'general', name: '⚙️ General Settings' },
    { id: 'homepage', name: '🏠 Homepage Content' },
    { id: 'trading', name: '📈 Trading Settings' },
  ];

  return (
    <div className='container mt-4'>
      <h3>📝 Content Management System</h3>
      <p>Control all frontend content and settings from here.</p>

      {message && <div className='alert alert-success'>{message}</div>}

      <div className='row'>
        <div className='col-md-3'>
          <div className='card'>
            <div className='card-header'>
              <h6>Content Sections</h6>
            </div>
            <div className='list-group list-group-flush'>
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`list-group-item list-group-item-action ${
                    activeSection === section.id ? 'active' : ''
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.name}
                </button>
              ))}
            </div>
            <div className='card-footer'>
              <button className='btn btn-success w-100' onClick={saveSection}>
                💾 Save All Changes
              </button>
            </div>
          </div>
        </div>

        <div className='col-md-9'>
          <div className='card'>
            <div className='card-header'>
              <h6>{sections.find((s) => s.id === activeSection)?.name}</h6>
            </div>
            <div className='card-body'>
              {/* General Settings */}
              {activeSection === 'general' && (
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label className='form-label'>Site Name</label>
                      <input
                        type='text'
                        className='form-control'
                        value={content.general.siteName}
                        onChange={(e) =>
                          handleContentChange(
                            'general',
                            'siteName',
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Site Description</label>
                      <textarea
                        className='form-control'
                        rows='3'
                        value={content.general.siteDescription}
                        onChange={(e) =>
                          handleContentChange(
                            'general',
                            'siteDescription',
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Support Email</label>
                      <input
                        type='email'
                        className='form-control'
                        value={content.general.supportEmail}
                        onChange={(e) =>
                          handleContentChange(
                            'general',
                            'supportEmail',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label className='form-label'>Support Phone</label>
                      <input
                        type='text'
                        className='form-control'
                        value={content.general.supportPhone}
                        onChange={(e) =>
                          handleContentChange(
                            'general',
                            'supportPhone',
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className='mb-3'>
                      <div className='form-check form-switch'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          checked={content.general.maintenanceMode}
                          onChange={(e) =>
                            handleContentChange(
                              'general',
                              'maintenanceMode',
                              e.target.checked
                            )
                          }
                        />
                        <label className='form-check-label'>
                          Maintenance Mode
                        </label>
                      </div>
                    </div>
                    <div className='mb-3'>
                      <div className='form-check form-switch'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          checked={content.general.registrationEnabled}
                          onChange={(e) =>
                            handleContentChange(
                              'general',
                              'registrationEnabled',
                              e.target.checked
                            )
                          }
                        />
                        <label className='form-check-label'>
                          Registration Enabled
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Homepage Content */}
              {activeSection === 'homepage' && (
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label className='form-label'>Hero Title</label>
                      <input
                        type='text'
                        className='form-control'
                        value={content.homepage.heroTitle}
                        onChange={(e) =>
                          handleContentChange(
                            'homepage',
                            'heroTitle',
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Hero Subtitle</label>
                      <textarea
                        className='form-control'
                        rows='2'
                        value={content.homepage.heroSubtitle}
                        onChange={(e) =>
                          handleContentChange(
                            'homepage',
                            'heroSubtitle',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label className='form-label'>Hero Button Text</label>
                      <input
                        type='text'
                        className='form-control'
                        value={content.homepage.heroButtonText}
                        onChange={(e) =>
                          handleContentChange(
                            'homepage',
                            'heroButtonText',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Trading Settings */}
              {activeSection === 'trading' && (
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label className='form-label'>Min Trade Amount ($)</label>
                      <input
                        type='number'
                        className='form-control'
                        value={content.trading.minTradeAmount}
                        onChange={(e) =>
                          handleContentChange(
                            'trading',
                            'minTradeAmount',
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Max Trade Amount ($)</label>
                      <input
                        type='number'
                        className='form-control'
                        value={content.trading.maxTradeAmount}
                        onChange={(e) =>
                          handleContentChange(
                            'trading',
                            'maxTradeAmount',
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label className='form-label'>
                        Default Trade Amount ($)
                      </label>
                      <input
                        type='number'
                        className='form-control'
                        value={content.trading.defaultTradeAmount}
                        onChange={(e) =>
                          handleContentChange(
                            'trading',
                            'defaultTradeAmount',
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>
                        Payout Percentage (%)
                      </label>
                      <input
                        type='number'
                        className='form-control'
                        value={content.trading.payoutPercentage}
                        onChange={(e) =>
                          handleContentChange(
                            'trading',
                            'payoutPercentage',
                            parseInt(e.target.value)
                          )
                        }
                        min='1'
                        max='100'
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContentManagement;
