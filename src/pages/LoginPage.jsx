import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, forgotPassword, verifyForgotOtp, resetPassword, loading, error } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  
  // 'login' | 'forgot_email' | 'forgot_otp' | 'forgot_reset'
  const [view, setView] = useState('login'); 
  
  const [form, setForm] = useState({ email: '', password: '', otp: '', newPassword: '', confirmPassword: '' });
  const [localError, setLocalError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    const res = await login(form.email, form.password);
    if (res.success) navigate(res.role === 'admin' ? '/admin' : '/');
    else setLocalError(res.error);
  };

  const handleForgotEmailSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    const res = await forgotPassword(form.email);
    if (res.success) {
      setView('forgot_otp');
      setSuccessMsg('OTP sent to your email.');
    } else setLocalError(res.error);
  };

  const handleForgotOtpSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMsg('');
    const res = await verifyForgotOtp(form.email, form.otp);
    if (res.success) {
      setView('forgot_reset');
      setSuccessMsg('OTP verified. Please enter your new password.');
    } else setLocalError(res.error);
  };

  const handleForgotResetSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMsg('');
    if (form.newPassword !== form.confirmPassword) {
      return setLocalError('Passwords do not match');
    }
    const res = await resetPassword(form.email, form.otp, form.newPassword);
    if (res.success) {
      setView('login');
      setForm({ ...form, password: '', otp: '', newPassword: '', confirmPassword: '' });
      setSuccessMsg('Password reset successfully. You can now login.');
    } else setLocalError(res.error);
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 relative">
        
        {view !== 'login' && (
          <button 
            onClick={() => { setView('login'); setLocalError(''); setSuccessMsg(''); }} 
            className="absolute top-4 left-4 p-2 text-gray-500 hover:text-gray-900 bg-gray-50 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/">
            <img src="/image.png" alt="Moksha Mandir" className="h-16 object-contain mix-blend-multiply" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900 mt-2">
            {view === 'login' && 'Welcome Back'}
            {view === 'forgot_email' && 'Reset Password'}
            {view === 'forgot_otp' && 'Verify OTP'}
            {view === 'forgot_reset' && 'Create New Password'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {view === 'login' && 'Login to your account'}
            {view === 'forgot_email' && 'Enter your email to receive an OTP'}
            {view === 'forgot_otp' && 'Enter the OTP sent to your email'}
            {view === 'forgot_reset' && 'Enter your new secure password'}
          </p>
        </div>

        {successMsg && <p className="text-xs text-green-600 bg-green-50 p-2 rounded text-center mb-4 border border-green-200">{successMsg}</p>}
        {displayError && <p className="text-xs text-red-500 bg-red-50 p-2 rounded text-center mb-4 border border-red-200">{displayError}</p>}

        {view === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Email</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange} required
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-600 block">Password</label>
                <button type="button" onClick={() => { setView('forgot_email'); setLocalError(''); setSuccessMsg(''); }} className="text-xs font-semibold text-brand-orange hover:underline">
                  Forgot Password?
                </button>
              </div>
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

            <button type="submit" disabled={loading}
              className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl text-sm hover:bg-orange-600 transition-colors disabled:opacity-60 mt-2">
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-center text-xs text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand-orange font-semibold">Sign Up</Link>
            </p>
          </form>
        )}

        {view === 'forgot_email' && (
          <form onSubmit={handleForgotEmailSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Email Address</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange} required
                placeholder="Enter your registered email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl text-sm hover:bg-orange-600 transition-colors disabled:opacity-60 mt-2">
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {view === 'forgot_otp' && (
          <form onSubmit={handleForgotOtpSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Enter OTP</label>
              <input
                name="otp" type="text" value={form.otp} onChange={handleChange} required
                placeholder="6-digit OTP"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl text-sm hover:bg-orange-600 transition-colors disabled:opacity-60 mt-2">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        {view === 'forgot_reset' && (
          <form onSubmit={handleForgotResetSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">New Password</label>
              <div className="relative">
                <input
                  name="newPassword" type={showPass ? 'text' : 'password'} value={form.newPassword}
                  onChange={handleChange} required minLength={6}
                  placeholder="New password"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Confirm New Password</label>
              <input
                name="confirmPassword" type={showPass ? 'text' : 'password'} value={form.confirmPassword}
                onChange={handleChange} required minLength={6}
                placeholder="Confirm new password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl text-sm hover:bg-orange-600 transition-colors disabled:opacity-60 mt-2">
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
