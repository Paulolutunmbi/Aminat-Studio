import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { dataService } from '../../services/dataService';

export const NewsletterSection: React.FC = () => {
  // TODO: Re-enable newsletter signup once production email/domain configuration is available.
  return (
    <section className="py-20 bg-[#F5F5F2] border-t border-[#E7E7E2]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="text-xs uppercase tracking-[0.15em] text-[#5A5E57] font-semibold block mb-3">
          Stay Connected
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] italic mb-4">
          Studio Journal
        </h2>
        <p className="text-base text-[#5A5E57] leading-relaxed mb-6 max-w-xl mx-auto">
          Newsletter signup is temporarily paused while the studio finalizes its production email
          and domain setup. Please use the contact details below for direct inquiries.
        </p>
        <div className="inline-flex items-center gap-2 bg-[#E8EDE0]/80 border border-[#8A9A5B]/40 px-4 py-3 text-sm text-[#1A1C19]">
          <Mail className="w-4 h-4 text-[#8A9A5B]" />
          <span>Newsletter subscription is currently disabled.</span>
        </div>
      </div>
    </section>
  );
};
