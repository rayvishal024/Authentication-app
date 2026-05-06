import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import './App.css';

axios.defaults.withCredentials = true;
const API_URL = 'https://api.freeapi.app/api/v1/users';

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login');
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${API_URL}/current-user`);
      if (res.data.success) {
        setUser(res.data.data);
        setView('profile');
      }
    } catch (err) {
      setUser(null);
      // Stay on login/register if not authenticated
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="auth-screen">
        <div className="loader-ring"></div>
      </div>
    );
  }

  return (
    <div className="auth-screen">
      <div className="auth-vault">
        <div className="vault-glow"></div>
        <div className="content-fader">
          {view === 'login' && <Login setView={setView} onLogin={checkAuth} />}
          {view === 'register' && <Register setView={setView} />}
          {view === 'profile' && <Profile user={user} onLogout={() => { setUser(null); setView('login'); }} />}
        </div>
      </div>
    </div>
  );
};

export default App;