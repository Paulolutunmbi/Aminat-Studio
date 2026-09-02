import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Loader2, Mail } from 'lucide-react';
import { api } from '../../services/api';

export const AdminForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await api.forgotPassword(email);
      setStatus('success');
      setMessage(response?.message || 'A password reset link has been sent to the admin email.');
    } catch (error: any) {
      setStatus('error');
      setMessage(error?.message || 'Password reset request failed.');
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
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl italic tracking-tight text-[#1A1A1A]">Reset password</h1>
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8A9A5B]">Admin access recovery</p>
        </div>

        {message && (
          <div className={`flex items-start gap-2 p-3 text-xs border ${status === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {status === 'error' && <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
              Admin email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A1C19] text-[#FFFFFF] py-3.5 px-6 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#8A9A5B] transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send reset link'}
          </button>
        </form>
      </div>
    </div>
  );
};
