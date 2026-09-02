import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, CheckCircle2, Eye, EyeOff, KeyRound, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

export const AdminSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('idle');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.setupAdmin(newPassword, confirmPassword);
      setStatus('success');
      setMessage(response.message || 'Admin setup complete. You can now log in.');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setStatus('error');
      setMessage(error?.message || 'Admin setup is no longer available.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] flex flex-col justify-center items-center p-6 text-[#1A1A1A]">
      <div className="w-full max-w-md mb-6">
        <Link to="/admin/login" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#737871] hover:text-[#1A1A1A] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Login</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-[#FFFFFF] p-8 md:p-10 border border-[#E7E7E2] shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-[#E8EDE0] rounded-full text-[#8A9A5B] mb-2">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl italic tracking-tight text-[#1A1A1A]">Aminat Studio</h1>
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8A9A5B]">Set up your admin account</p>
        </div>

        {message && (
          <div className={`flex items-start gap-2 p-3 text-xs border ${status === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {status === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
            <span>{message}</span>
          </div>
        )}

        {status === 'success' ? (
          <button type="button" onClick={() => navigate('/admin/login')} className="w-full bg-[#1A1C19] text-[#FFFFFF] py-3.5 px-6 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#8A9A5B] transition-colors">
            Continue to Admin Login
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">New password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Enter a secure password"
                  className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-3 pr-11 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
                  required
                />
                <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737871] hover:text-[#1A1A1A]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">Confirm password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm your password"
                className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
                required
              />
            </div>

            <p className="text-[11px] leading-relaxed text-[#737871]">Use at least 8 characters with uppercase, lowercase, a number, and a symbol.</p>

            <button type="submit" disabled={loading} className="w-full bg-[#1A1C19] text-[#FFFFFF] py-3.5 px-6 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#8A9A5B] transition-colors flex items-center justify-center gap-2 shadow-xs">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create admin password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
