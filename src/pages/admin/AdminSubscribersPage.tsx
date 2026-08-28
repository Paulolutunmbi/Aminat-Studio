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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.15em] text-[#737871] font-semibold block mb-1">
            Audience & Community
          </span>
          <h1 className="font-serif text-3xl italic tracking-tight text-[#1A1A1A]">
            Newsletter Subscribers
          </h1>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={subscribers.length === 0}
          className="border border-[#E7E7E2] bg-[#FFFFFF] text-[#1A1A1A] px-4 py-2 text-xs uppercase tracking-wider font-medium hover:border-[#1A1A1A] hover:bg-[#F9F9F7] transition-colors flex items-center gap-2 self-start sm:self-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Stats Callout */}
      <div className="bg-[#FFFFFF] p-6 border border-[#E7E7E2] flex items-center gap-4">
        <div className="p-3 bg-[#E8EDE0] rounded-full text-[#8A9A5B]">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <div className="font-serif text-2xl italic text-[#1A1A1A]">
            {subscribers.length} Active {subscribers.length === 1 ? 'Subscriber' : 'Subscribers'}
          </div>
          <p className="text-xs text-[#737871] mt-0.5">
            Art enthusiasts who joined via the public "Stay Connected" form to receive release updates.
          </p>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-[#FFFFFF] border border-[#E7E7E2] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E7E7E2] bg-[#F9F9F7] text-xs uppercase tracking-wider text-[#737871]">
              <th className="py-3 px-4 font-semibold">Email Address</th>
              <th className="py-3 px-4 font-semibold">Subscribed Date</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E7E2] text-sm text-[#1A1A1A]">
            {loading ? (
              <tr>
                <td colSpan={3} className="py-10 text-center text-[#737871]">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  <span>Loading subscribers...</span>
                </td>
              </tr>
            ) : subscribers.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-[#737871]">
                  No subscribers yet. Readers who subscribe on your homepage will appear here.
                </td>
              </tr>
            ) : (
              subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#F9F9F7]/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#737871]" />
                      <span className="font-medium text-[#1A1A1A]">{sub.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#737871]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(sub.subscribedAt).toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setDeletingSub(sub)}
                      className="p-1.5 text-[#737871] hover:text-red-700 hover:bg-red-50 transition-colors"
                      title="Remove subscriber"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingSub}
        title="Remove Subscriber"
        message={`Are you sure you want to remove ${deletingSub?.email} from your studio subscriber list?`}
        confirmLabel="Remove"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingSub(null)}
      />
    </div>
  );
};
