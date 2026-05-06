import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setView, onLogin }) => {
     const [formData, setFormData] = useState({ username: '', password: '' });
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          setError('');
          try {
               const res = await axios.post('https://api.freeapi.app/api/v1/users/login', formData);
               if (res.data.success) onLogin();
          } catch (err) {
               setError(err.response?.data?.message || "Invalid credentials");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="content-fader">
               <h2>Welcome Back</h2>
               <p className="subtitle">Enter your credentials to access the vault.</p>

               {error && <div className="error-box">{error}</div>}

               <form onSubmit={handleSubmit}>
                    <input
                         type="text"
                         placeholder="Username"
                         onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                         required
                    />
                    <input
                         type="password"
                         placeholder="Password"
                         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                         required
                    />

                    <button disabled={loading} className="primary-btn">
                         {loading ? "Authenticating..." : "Access Portal"}
                    </button>
               </form>

               <p className="footer-text">
                    New here? <button onClick={() => setView('register')}>Create Account</button>
               </p>
          </div>
     );
};

export default Login;