import React, { useState } from 'react';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import '../style/Signup.css';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = form;

    // Trimmed values check
    if (!username.trim() || !email.trim() || !password) {
      setError('All fields are required.');
      setSuccess(null);
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      setSuccess(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('https://ar-fb-backhend.vercel.app/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      console.log('API Response:', data);

      setSuccess('Signup successful!');
      setForm({ username: '', email: '', password: '' });
    } catch (err) {
      console.error('API Error:', err.message);
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={form.username}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
