import React, { useState, useEffect } from 'react';
import {
  Mail,
  Trash2,
  CheckCircle,
  MailOpen,
  Calendar,
  Reply,
  X,
  Clock,
  Loader2,
} from 'lucide-react';
import { Message } from '../../types';
import { dataService } from '../../services/dataService';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';

export const AdminMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deletingMessage, setDeletingMessage] = useState<Message | null>(null);

  const load = async () => {
    setLoading(true);
    const list = await dataService.getMessages();
    setMessages(list);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggleRead = async (msg: Message, e?: React.MouseEvent) => {
    e?.stopPropagation();
    await dataService.markMessageRead(msg.id, !msg.read);
    await load();
  };

  const handleViewMessage = async (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      await dataService.markMessageRead(msg.id, true);
      await load();
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingMessage) return;
    await dataService.deleteMessage(deletingMessage.id);
    if (selectedMessage?.id === deletingMessage.id) {
      setSelectedMessage(null);
    }
    setDeletingMessage(null);
    await load();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-[0.15em] text-[#737871] font-semibold block mb-1">
          Inquiries & Notes
        </span>
        <h1 className="font-serif text-3xl italic tracking-tight text-[#1A1A1A]">
          Studio Inquiries
        </h1>
      </div>

      {/* Messages List */}
      <div className="bg-[#FFFFFF] border border-[#E7E7E2] divide-y divide-[#E7E7E2]">
        {loading ? (
          <div className="py-12 text-center text-[#737871]">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
            <span>Loading inquiries...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="py-12 text-center text-[#737871]">
            No inquiries received yet. Notes submitted through the Contact page will appear here.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleViewMessage(msg)}
              className={`p-4 md:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer transition-colors ${
                msg.read
                  ? 'bg-[#FFFFFF] hover:bg-[#F9F9F7]'
                  : 'bg-[#E8EDE0]/30 hover:bg-[#E8EDE0]/50 border-l-4 border-[#8A9A5B]'
              }`}
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm text-[#1A1A1A]">{msg.name}</span>
                  <span className="text-xs text-[#737871]">&lt;{msg.email}&gt;</span>
                  {!msg.read && (
                    <span className="bg-[#8A9A5B] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#5A5E57] line-clamp-1 font-sans">
                  {msg.message}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#737871] shrink-0 self-end md:self-auto">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleToggleRead(msg, e)}
                    className="p-1.5 hover:bg-[#E8EDE0] rounded text-[#5A5E57] hover:text-[#1A1A1A] transition-colors"
                    title={msg.read ? 'Mark as unread' : 'Mark as read'}
                  >
                    {msg.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletingMessage(msg);
                    }}
                    className="p-1.5 hover:bg-red-50 rounded text-[#737871] hover:text-red-700 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Reader Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFFFF] max-w-xl w-full p-6 md:p-8 border border-[#E7E7E2] shadow-2xl space-y-6">
            <div className="flex justify-between items-start border-b border-[#E7E7E2] pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#737871] font-semibold block mb-1">
                  Inquiry Details
                </span>
                <h2 className="font-serif text-2xl italic text-[#1A1A1A]">
                  {selectedMessage.name}
                </h2>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-xs text-[#8A9A5B] hover:underline font-medium"
                >
                  {selectedMessage.email}
                </a>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-[#737871] hover:text-[#1A1A1A] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#737871] block">
                Received on: {new Date(selectedMessage.createdAt).toLocaleString()}
              </span>
              <div className="p-4 bg-[#F9F9F7] border border-[#E7E7E2] text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[#E7E7E2]">
              <button
                onClick={() => setDeletingMessage(selectedMessage)}
                className="text-xs uppercase tracking-wider text-red-700 hover:underline font-medium"
              >
                Delete Message
              </button>

              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                    'Re: Studio Inquiry - Aminat Studio'
                  )}`}
                  className="px-5 py-2.5 bg-[#1A1C19] text-[#FFFFFF] text-xs uppercase tracking-wider font-semibold hover:bg-[#8A9A5B] transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2.5 text-xs uppercase tracking-wider font-medium text-[#5A5E57] hover:bg-[#E8EDE0]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingMessage}
        title="Delete Inquiry"
        message={`Are you sure you want to permanently delete the message from "${deletingMessage?.name}"?`}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingMessage(null)}
      />
    </div>
  );
};
