import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from 'lucide-react';
import { dataService } from '../services/dataService';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get('subject') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    initialSubject ? `${initialSubject}\n\n` : ''
  );
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (initialSubject && !message.includes(initialSubject)) {
      setMessage(`${initialSubject}\n\n`);
    }
  }, [initialSubject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    setStatus('loading');
    try {
      await dataService.addMessage(name, email, message);
      setStatus('success');
      setStatusMessage('Thank you! Your message has been sent directly to the studio.');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setStatusMessage('Failed to send message. Please try again or email directly.');
    }
  };

  return (
    <div className="py-16 md:py-24 px-6 md:px-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <span className="text-xs uppercase tracking-[0.15em] text-[#5A5E57] font-semibold block mb-3">
          Get in Touch
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] italic tracking-tight mb-4">
          Contact the Studio
        </h1>
        <p className="text-base text-[#5A5E57] leading-relaxed font-sans">
          Whether you have an inquiry regarding available artwork, a note of connection, or would
          like to discuss custom nature-inspired pieces, please feel free to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Contact Form */}
        <div className="md:col-span-7 bg-[#F5F5F2] p-8 md:p-10 border border-[#E7E7E2] shadow-xs">
          <h2 className="font-serif text-2xl text-[#1A1A1A] italic mb-6">
            Send an Inquiry
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Hannah Clark"
                className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                Message or Inquiry *
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your note, question, or artwork reference here..."
                className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B] transition-colors resize-y"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto bg-[#1A1C19] text-[#FFFFFF] px-8 py-4 text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#8A9A5B] transition-colors flex items-center justify-center gap-2 min-w-[180px] shadow-xs"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          {status === 'success' && (
            <div className="mt-6 flex items-center gap-3 p-4 bg-[#E8EDE0] text-[#1A1C19] text-sm border border-[#8A9A5B]/40 rounded-xs">
              <CheckCircle2 className="w-5 h-5 text-[#8A9A5B] shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-6 flex items-center gap-3 p-4 bg-amber-50 text-amber-900 text-sm border border-amber-200 rounded-xs">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Studio Direct Information & Social Links */}
        <div className="md:col-span-5 space-y-10">
          <div className="border-b border-[#E7E7E2] pb-8">
            <span className="text-xs uppercase tracking-[0.15em] text-[#737871] font-semibold block mb-2">
              Direct Inquiries
            </span>
            <a
              href="mailto:aminatstudio.art@gmail.com"
              className="font-serif text-2xl text-[#1A1A1A] italic hover:text-[#8A9A5B] flex items-center gap-2 transition-colors break-all"
            >
              <Mail className="w-5 h-5 text-[#8A9A5B] shrink-0" />
              <span>aminatstudio.art@gmail.com</span>
            </a>
            <p className="text-sm text-[#5A5E57] mt-2 font-sans">
              Emails are answered directly by Aminat within 2 to 3 business days.
            </p>
          </div>

          <div className="border-b border-[#E7E7E2] pb-8">
            <span className="text-xs uppercase tracking-[0.15em] text-[#737871] font-semibold block mb-4">
              Connect & Follow
            </span>
            <div className="space-y-3">
              <a
                href="https://www.youtube.com/@AminatStudio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-[#F5F5F2] hover:bg-[#E8EDE0]/60 transition-colors border border-[#E7E7E2] hover:border-[#8A9A5B]/40"
              >
                <div>
                  <span className="font-semibold text-sm text-[#1A1A1A] block">YouTube</span>
                  <span className="text-xs text-[#737871]">Studio painting sessions & timelapse</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#1A1A1A]" />
              </a>

              <a
                href="https://www.tiktok.com/@aminatstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-[#F5F5F2] hover:bg-[#E8EDE0]/60 transition-colors border border-[#E7E7E2] hover:border-[#8A9A5B]/40"
              >
                <div>
                  <span className="font-semibold text-sm text-[#1A1A1A] block">TikTok</span>
                  <span className="text-xs text-[#737871]">Short art process videos & sketches</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#1A1A1A]" />
              </a>
            </div>
          </div>

          <div className="bg-[#E8EDE0]/40 p-6 border-l-2 border-[#8A9A5B]">
            <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#1A1A1A] mb-2">
              Studio Location
            </h3>
            <p className="text-sm text-[#5A5E57] leading-relaxed">
              Based in a nature-inspired independent studio space. Studio visits are available by
              private appointment for serious collectors and curators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
