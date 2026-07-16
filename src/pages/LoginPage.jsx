import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Flower2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    const res = await login(form.email, form.password);
    if (res.success) navigate(res.role === 'admin' ? '/admin' : '/');
    else setLocalError(res.error);
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/">
            <img src="/image.png" alt="Moksha Mandir" className="h-16 object-contain mix-blend-multiply" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900 mt-2">Welcome Back</h1>
          <p className="text-xs text-gray-500 mt-1">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Email</label>
            <input
              name="email" type="email" value={form.email} onChange={handleChange} required
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Password</label>
            <div className="relative">
              <input
                name="password" type={showPass ? 'text' : 'password'} value={form.password}
                onChange={handleChange} required
                placeholder="Your password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {displayError && <p className="text-xs text-red-500 text-center">{displayError}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl text-sm hover:bg-orange-600 transition-colors disabled:opacity-60 mt-2">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-brand-orange font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
