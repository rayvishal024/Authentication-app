import React from 'react';
import axios from 'axios';

const Profile = ({ user, onLogout }) => {
     const handleLogout = async () => {
          try {
               const res = await axios.post('https://api.freeapi.app/api/v1/users/logout');
               if (res.data.success) onLogout();
          } catch (err) {
               console.error("Logout failed");
          }
     };

     return (
          <div className="content-fader">
               <div className="profile-header">
                    <div className="user-avatar">
                         {user?.username?.[0].toUpperCase()}
                    </div>
                    <h2>{user?.username}</h2>
                    <span className="role-badge">{user?.role}</span>
               </div>

               <div className="info-card">
                    <p className="info-label">Email Address</p>
                    <p className="info-value">{user?.email}</p>
               </div>

               <div className="info-card">
                    <p className="info-label">User Identifier</p>
                    <p className="info-value font-mono">{user?._id.slice(-12)}</p>
               </div>

               <button onClick={handleLogout} className="primary-btn logout-variant">
                    Secure Logout
               </button>
          </div>
     );
};

export default Profile;