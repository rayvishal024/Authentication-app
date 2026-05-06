import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setView }) => {
     const [formData, setFormData] = useState({
          username: '',
          email: '',
          password: '',
          role: 'ADMIN',
     });
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          setError('');
          try {
               const res = await axios.post('https://api.freeapi.app/api/v1/users/register', formData);
               if (res.data.success) setView('login');
          } catch (err) {
               setError(err.response?.data?.message || "Registration failed");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="content-fader">
               <h2>Join the Network</h2>
               <p className="subtitle">Create your secure profile to get started.</p>

               {error && <div className="error-box">{error}</div>}

               <form onSubmit={handleSubmit}>
                    <input
                         type="text"
                         placeholder="Username"
                         onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                         required
                    />
                    <input
                         type="email"
                         placeholder="Email Address"
                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                         required
                    />
                    <input
                         type="password"
                         placeholder="Password"
                         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                         required
                    />

                    <button disabled={loading} className="primary-btn">
                         {loading ? "Creating Profile..." : "Complete Registration"}
                    </button>
               </form>

               <p className="footer-text">
                    Already a member? <button onClick={() => setView('login')}>Sign In</button>
               </p>
          </div>
     );
};

export default Register;