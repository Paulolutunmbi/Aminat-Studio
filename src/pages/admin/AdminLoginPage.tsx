import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('aminat');
  const [password, setPassword] = useState('nature2024');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Please enter a valid username and password.');
      }
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUsername('aminat');
    setPassword('nature2024');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] flex flex-col justify-center items-center p-6 text-[#1A1A1A]">
      {/* Return to Public Website */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#737871] hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Studio Gallery</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#FFFFFF] p-8 md:p-10 border border-[#E7E7E2] shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-[#E8EDE0] rounded-full text-[#8A9A5B] mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl italic tracking-tight text-[#1A1A1A]">
            Aminat Studio
          </h1>
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8A9A5B]">
            Artist Management Portal
          </p>
        </div>

        {/* Demo Helper Banner */}
        <div className="bg-[#E8EDE0]/40 p-3.5 border border-[#8A9A5B]/30 text-xs text-[#5A5E57] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#8A9A5B]" />
              Admin Access
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[#8A9A5B] hover:underline font-semibold text-[11px] uppercase tracking-wider"
            >
              Fill Credentials
            </button>
          </div>
          <p className="text-[11px] leading-relaxed text-[#737871]">
            Protected artist area. Test username: <strong className="text-[#1A1A1A]">aminat</strong> | password: <strong className="text-[#1A1A1A]">nature2024</strong>
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A1C19] text-[#FFFFFF] py-3.5 px-6 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#8A9A5B] transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Access Admin Workspace'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
