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
      <div>
        <span className="text-xs uppercase tracking-[0.15em] text-[#737871] font-semibold block mb-1">
          Inquiries & Notes
        </span>
        <h1 className="font-serif text-3xl italic tracking-tight text-[#1A1A1A]">
          Messages
        </h1>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E7E7E2] p-8 text-center text-[#1A1A1A]">
        <h2 className="font-serif text-2xl italic mb-3">Messages</h2>
        <p className="text-sm text-[#5A5E57] leading-relaxed max-w-xl mx-auto">
          This page will be available once the production domain and contact/email system are set up.
        </p>
      </div>
    </div>
  );
};
