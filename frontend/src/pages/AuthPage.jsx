import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi, signupApi } from '../services/api.js';
import { useApp } from '../context/AppContext.jsx';

const AuthPage = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = isSignup ? form : { email: form.email, password: form.password };
      const data = isSignup ? await signupApi(payload) : await loginApi(payload);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <main className="container">
      <section className="card auth-card">
        <h2>{isSignup ? 'Create account' : 'Welcome back'}</h2>
        <form onSubmit={submit}>
          {isSignup && (
            <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          )}
          <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          {error && <p className="error">{error}</p>}
          <button className="primary-btn" type="submit">{isSignup ? 'Sign up' : 'Login'}</button>
        </form>
        <button className="ghost-btn" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account?' : 'Need an account?'}
        </button>
      </section>
    </main>
  );
};

export default AuthPage;
