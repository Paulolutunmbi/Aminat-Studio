import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { dataService } from '../../services/dataService';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await dataService.addSubscriber(email);
      if (res.success) {
        setStatus('success');
        setMessage(res.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(res.message);
      }
    } catch {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <section className="py-24 bg-[#F5F5F2] border-t border-[#E7E7E2]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="text-xs uppercase tracking-[0.15em] text-[#5A5E57] font-semibold block mb-3">
          Stay Connected
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] italic mb-4">
          Join the Studio Journal
        </h2>
        <p className="text-base text-[#5A5E57] leading-relaxed mb-8 max-w-xl mx-auto">
          Receive occasional notes when new paintings, nature studies, or studio updates are
          released. No spam, only genuine artistic moments.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737871]" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder="Your email address"
              className="w-full bg-[#FFFFFF] border border-[#737871] py-3.5 pl-11 pr-4 text-sm text-[#1A1A1A] placeholder-[#737871] focus:outline-none focus:border-[#8A9A5B] transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-[#1A1C19] text-[#FFFFFF] px-7 py-3.5 text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#8A9A5B] transition-colors flex items-center justify-center min-w-[140px] shadow-xs"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Subscribe'
            )}
          </button>
        </form>

        {status === 'success' && (
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-[#1A1C19] bg-[#E8EDE0] border border-[#8A9A5B]/40 px-4 py-2 rounded-xs">
            <CheckCircle2 className="w-4 h-4 text-[#8A9A5B]" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-amber-900 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xs">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>{message}</span>
          </div>
        )}
      </div>
    </section>
  );
};
