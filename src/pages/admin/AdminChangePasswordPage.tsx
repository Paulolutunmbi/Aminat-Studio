import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AlertCircle, KeyRound, Loader2 } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const AdminChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, authLoading, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.changeAdminPassword(currentPassword, newPassword, confirmPassword);
      await logout();
      navigate('/admin/login', { replace: true });
    } catch (requestError: any) {
      setError(requestError?.message || 'Password change failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] flex justify-center items-center p-6 text-[#1A1A1A]">
      <div className="w-full max-w-md bg-[#FFFFFF] p-8 md:p-10 border border-[#E7E7E2] shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-[#E8EDE0] rounded-full text-[#8A9A5B] mb-2">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl italic tracking-tight">Choose a new password</h1>
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8A9A5B]">Update your admin password</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs uppercase tracking-wider font-semibold">
            Current password
            <input value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} type="password" className="mt-1.5 w-full border border-[#E7E7E2] p-3 text-sm font-normal" required />
          </label>
          <label className="block text-xs uppercase tracking-wider font-semibold">
            New password
            <input value={newPassword} onChange={(event) => setNewPassword(event.target.value)} type="password" className="mt-1.5 w-full border border-[#E7E7E2] p-3 text-sm font-normal" required />
          </label>
          <label className="block text-xs uppercase tracking-wider font-semibold">
            Confirm new password
            <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" className="mt-1.5 w-full border border-[#E7E7E2] p-3 text-sm font-normal" required />
          </label>
          <button type="submit" disabled={loading} className="w-full bg-[#1A1C19] text-[#FFFFFF] py-3.5 px-6 text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Change password'}
          </button>
        </form>
      </div>
    </div>
  );
};
