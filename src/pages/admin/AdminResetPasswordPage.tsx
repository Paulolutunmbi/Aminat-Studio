import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';

export const AdminResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get('token') || '', [searchParams]);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) {
      setStatus('error');
      setMessage('Missing reset token. Please request a new reset link.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await api.resetPassword(token, newPassword);
      if (response?.success) {
        setStatus('success');
        setMessage(response.message || 'Password reset successful. Please sign in again.');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setStatus('error');
        setMessage(response?.message || 'Password reset failed.');
      }
    } catch (error: any) {
      setStatus('error');
      setMessage(error?.message || 'Password reset failed.');
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
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl italic tracking-tight text-[#1A1A1A]">Choose a new password</h1>
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8A9A5B]">Passwords require 8+ characters with uppercase, lowercase, a number, and a symbol.</p>
        </div>

        {message && (
          <div className={`flex items-start gap-2 p-3 text-xs border ${status === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {status === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter a new password"
              className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A1C19] text-[#FFFFFF] py-3.5 px-6 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#8A9A5B] transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
};
