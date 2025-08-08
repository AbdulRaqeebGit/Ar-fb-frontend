import React, { useState } from 'react';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom'; // 👈 Add useNavigate
// import '../style/Signup.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // 👈 Use navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('https://ar-fb-backhend.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // ✅ Save token or user data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setSuccess('Login successful!');
      navigate('/dashboard'); // ✅ Navigate to Dashboard

    } catch (err) {
      setError(err.message || 'Failed to log in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <Input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-4" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/" className="text-blue-500">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
