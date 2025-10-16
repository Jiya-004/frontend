import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, LogOut, CreditCard, ShoppingBag, Gift, Edit, Save, ArrowLeft, X } from 'lucide-react';
import axios from 'axios';
import '../css/MyAccount.css';

/**
 * Account information card component (No change needed)
 */
const InfoCard = ({ icon: Icon, title, value, onEdit, editable = false }) => (
  <div className="info-card">
    <div className="info-card-content">
      <div>
        <h4 className="info-card-title">{title}</h4>
        <p className={`info-card-value ${title === 'Password' ? 'password-value' : ''}`}>{value}</p>
      </div>
      {editable && (
        <button 
          onClick={onEdit}
          className="edit-button"
          aria-label={`Edit ${title}`}
        >
          <Edit className="edit-icon" />
        </button>
      )}
    </div>
    <Icon className="card-icon" />
  </div>
);

/**
 * Custom Modal for editing fields (No change needed)
 */
const EditModal = ({ title, field, currentValue, onClose, onSave }) => {
  const [newValue, setNewValue] = useState(currentValue);
  const [error, setError] = useState('');

  const handleFinalSave = () => {
    if (!newValue.trim()) {
      setError(`${title} cannot be empty.`);
      return;
    }
    onSave(field, newValue); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">Update {title}</h3>
          <button onClick={onClose} className="modal-close-button">
            <X className="close-icon" />
          </button>
        </div>
        
        <label htmlFor={field} className="modal-label">New {title}</label>
        <input
          id={field}
          type={field === 'password' ? 'password' : 'text'}
          value={newValue}
          onChange={(e) => { setNewValue(e.target.value); setError(''); }}
          className="modal-input"
          placeholder={`Enter new ${title.toLowerCase()}`}
        />
        
        {error && <p className="modal-error">{error}</p>}
        
        <div className="modal-actions">
          <button onClick={onClose} className="modal-cancel-button">
            Cancel
          </button>
          <button onClick={handleFinalSave} className="modal-save-button">
            <Save className="save-icon" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Main Account Dashboard Component
 */
export default function MyAccount() {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFieldToEdit, setCurrentFieldToEdit] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  // --- START FIX: Standardize authentication check and data fetching ---
  useEffect(() => {
    // ⚠️ ASSUMPTION: The user object in localStorage has an 'email' key.
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if the user object exists AND contains a key called 'email'
    if (!storedUser || !storedUser.email) { 
      setIsLoggedIn(false);
      return;
    }

    // Use stored email for fetching user data
    axios.get(`http://127.0.0.1:8085/api/user?email=${storedUser.email}`)
      .then(res => {
        // Map backend response keys (name, email) to frontend state keys (userName, gmail)
        setUserData({
          userName: res.data.name,
          gmail: res.data.email 
        });
        setIsLoggedIn(true);
      })
      .catch(err => {
        console.error('Failed to fetch user:', err);
        setIsLoggedIn(false);
      });
  }, []);
  // --- END FIX ---

  // --- START FIX: Update handleSave to use consistent authentication keys ---
  const handleSave = async (field, value) => {
    // ⚠️ ASSUMPTION: The user object in localStorage has an 'email' key.
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.email) { 
        setStatusMessage({ message: 'Error: User not authenticated.', type: 'error' });
        setIsModalOpen(false);
        return;
    }

    // Payload uses existing email (from localStorage) for user identification
    const payload = { email: storedUser.email }; 
    let updatedLocalStorageData = { ...storedUser };

    // Map frontend state keys (field) to backend payload keys
    if (field === "userName") {
        payload.name = value; // Backend expects 'name'
        updatedLocalStorageData.name = value; // Update 'name' in local storage object
    } else if (field === "gmail") {
        payload.new_email = value; // Backend expects 'new_email'
        updatedLocalStorageData.email = value; // Update 'email' in local storage object
        // NOTE: If email changes, the next API calls must use the new email
        payload.email = storedUser.email; // Use OLD email for API call identification
    } else if (field === "password") {
        payload.password = value;
    }

    try {
      const res = await axios.put('http://127.0.0.1:8085/api/user', payload);
      
      // Update frontend state with the new value
      setUserData(prev => ({ 
        ...prev, 
        [field]: field === 'password' ? prev.password : value 
      }));
      
      // Update localStorage with the changes
      localStorage.setItem('user', JSON.stringify(updatedLocalStorageData));

      setIsModalOpen(false);
      setStatusMessage({ message: res.data.message || `${field} updated successfully!`, type: 'success' });
      setTimeout(() => setStatusMessage({ message: '', type: '' }), 3000);

    } catch (err) {
      console.error('Update failed:', err.response?.data || err);
      setIsModalOpen(false); 
      setStatusMessage({ 
        message: err.response?.data?.message || 'Failed to update account.', 
        type: 'error' 
      });
      setTimeout(() => setStatusMessage({ message: '', type: '' }), 3000);
    }
  };
  // --- END FIX ---


  const openModal = (field) => {
    setCurrentFieldToEdit(field);
    setIsModalOpen(true);
  };

  const getModalDetails = () => {
    if (!currentFieldToEdit || !userData) return {};
    const titleMap = {
      userName: 'User Name',
      gmail: 'Email Address',
      password: 'Password',
    };
    return {
      title: titleMap[currentFieldToEdit],
      currentValue: currentFieldToEdit === 'password' ? '' : userData[currentFieldToEdit],
      field: currentFieldToEdit,
    };
  };

  const modalDetails = getModalDetails();

  return (
    <div className="account-container">
      {/* Header */}
      <header className="account-header">
        <div className="header-back"
          onClick={() => {
            window.location.replace("/home"); 
          }}>
          <ArrowLeft className="back-icon" />
          <span className="back-text">Back to home</span>
        </div>
        <button
          className="signout-button"
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
            window.location.replace("/"); 
          }}
        >
          <LogOut className="signout-icon" />
          Sign out
        </button>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="page-title">
          <span className="title-accent">My</span> Account
        </h1>

        {statusMessage.message && (
          <div className={`status-message ${statusMessage.type === 'success' ? 'status-success' : 'status-error'}`}>
            {statusMessage.message}
          </div>
        )}

        <div className="account-layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="profile-summary">
              <div className="profile-avatar">
                <User size={40} />
              </div>
              <h2 className="profile-name">{isLoggedIn && userData ? userData.userName : "Guest"}</h2>
              <p className="profile-email">{isLoggedIn && userData ? userData.gmail : "Please log in"}</p>
            </div>

            <nav className="sidebar-nav">
              {[ 
                { name: 'Personal Information', icon: User },
                { name: 'Billing & Payments', icon: CreditCard },
                { name: 'Order History', icon: ShoppingBag },
                { name: 'Gift Cards', icon: Gift }
              ].map(item => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={`#${item.name.toLowerCase().replace(/ & /g, '_').replace(/ /g, '-')}`}
                    className={`nav-link ${item.name === 'Personal Information' ? 'nav-link-active' : ''}`}
                  >
                    <IconComponent className="nav-icon" />
                    {item.name}
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Right Content */}
          <div className="content-area">
            <h2 className="content-title">Personal Information</h2>

            {!isLoggedIn || !userData ? (
              <p className="login-prompt">
                You are not logged in. Please <a href="/login">log in</a> to access your account.
              </p>
            ) : (
              <>
                <p className="content-subtitle">
                  Manage your personal information, including your user name, email address, and password.
                </p>

                <div className="info-grid">
                  <InfoCard 
                    icon={User} 
                    title="User Name" 
                    value={userData.userName} 
                    onEdit={() => openModal('userName')}
                    editable={true}
                  />
                  <InfoCard 
                    icon={Mail} 
                    title="Email Address" 
                    value={userData.gmail} 
                    onEdit={() => openModal('gmail')}
                    editable={true}
                  />
                  <InfoCard 
                    icon={Lock} 
                    title="Password" 
                    value="********"
                    onEdit={() => openModal('password')}
                    editable={true}
                  />
                </div>

                <div className="additional-info">
                  <h3 className="additional-title">Other Details</h3>
                  <div className="additional-grid">
                    <InfoCard icon={CreditCard} title="Billing Status" value="Active" />
                    <InfoCard icon={Gift} title="Gift Card Balance" value="Rs. 500.00" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal 
          title={modalDetails.title}
          field={modalDetails.field}
          currentValue={modalDetails.currentValue}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}