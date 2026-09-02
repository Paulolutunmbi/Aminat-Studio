import React, { useState, useEffect } from 'react';
import { Download, Trash2, Mail, Users, Calendar, Loader2 } from 'lucide-react';
import { Subscriber } from '../../types';
import { dataService } from '../../services/dataService';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';

export const AdminSubscribersPage: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingSub, setDeletingSub] = useState<Subscriber | null>(null);

  const load = async () => {
    setLoading(true);
    const list = await dataService.getSubscribers();
    setSubscribers(list);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deletingSub) return;
    await dataService.deleteSubscriber(deletingSub.id);
    setDeletingSub(null);
    await load();
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) return;
    const headers = 'ID,Email,SubscribedAt\n';
    const rows = subscribers
      .map((s) => `"${s.id}","${s.email}","${s.subscribedAt}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aminat_studio_subscribers_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.15em] text-[#737871] font-semibold block mb-1">
            Audience & Community
          </span>
          <h1 className="font-serif text-3xl italic tracking-tight text-[#1A1A1A]">
            Subscribers
          </h1>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E7E7E2] p-8 text-center text-[#1A1A1A]">
        <h2 className="font-serif text-2xl italic mb-3">Subscribers</h2>
        <p className="text-sm text-[#5A5E57] leading-relaxed max-w-xl mx-auto">
          This page will be available once the production domain and email/newsletter system are set up.
        </p>
      </div>
    </div>
  );
};
