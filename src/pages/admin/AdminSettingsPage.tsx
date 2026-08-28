import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, RotateCcw, Loader2 } from 'lucide-react';
import { StudioSettings } from '../../types';
import { dataService } from '../../services/dataService';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<StudioSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await dataService.getSettings();
      setSettings(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      await dataService.updateSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    setIsResetConfirmOpen(false);
    setLoading(true);
    await dataService.resetToDefaults();
    const data = await dataService.getSettings();
    setSettings(data);
    setLoading(false);
    alert('Studio data has been restored to default artwork, inquiries, and settings.');
  };

  if (loading || !settings) {
    return (
      <div className="py-16 text-center text-[#71787d]">
        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
        <span>Loading studio settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.15em] text-[#737871] font-semibold block mb-1">
            Studio Configuration
          </span>
          <h1 className="font-serif text-3xl italic tracking-tight text-[#1A1A1A]">
            Studio Settings
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsResetConfirmOpen(true)}
          className="border border-[#E7E7E2] bg-[#FFFFFF] text-xs uppercase tracking-wider font-medium text-[#737871] hover:text-red-700 hover:border-red-300 px-3 py-1.5 flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-xs"
          title="Reset all mock data to original factory state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Studio settings updated successfully.</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-[#FFFFFF] border border-[#E7E7E2] p-6 md:p-8 space-y-6">
        {/* Profile / Silhouette Image */}
        <ImageUploader
          value={settings.profileImage}
          onChange={(img) => setSettings({ ...settings, profileImage: img })}
          label="Artist Portrait / Studio Emblem"
        />

        {/* Studio Name & Artist Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
              Studio Brand Name
            </label>
            <input
              type="text"
              value={settings.studioName}
              onChange={(e) => setSettings({ ...settings, studioName: e.target.value })}
              className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
              Artist Name
            </label>
            <input
              type="text"
              value={settings.artistName}
              onChange={(e) => setSettings({ ...settings, artistName: e.target.value })}
              className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
              required
            />
          </div>
        </div>

        {/* Short Bio / Tagline */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
            Short Artist Description / Tagline
          </label>
          <input
            type="text"
            value={settings.description}
            onChange={(e) => setSettings({ ...settings, description: e.target.value })}
            className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
            required
          />
          <p className="text-[11px] text-[#737871] mt-1">
            "An emerging, self-taught artist inspired by nature."
          </p>
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
            Studio Contact Email
          </label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
            required
          />
        </div>

        {/* Social Links */}
        <div className="space-y-4 pt-2 border-t border-[#E7E7E2]">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#737871] block">
            Social & Channel Links
          </span>

          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#1A1A1A] mb-1.5">
              YouTube Channel URL
            </label>
            <input
              type="url"
              value={settings.youtube}
              onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
              placeholder="https://www.youtube.com/@AminatStudio"
              className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#1A1A1A] mb-1.5">
              TikTok Profile URL
            </label>
            <input
              type="url"
              value={settings.tiktok}
              onChange={(e) => setSettings({ ...settings, tiktok: e.target.value })}
              placeholder="https://www.tiktok.com/@aminatstudio"
              className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-[#E7E7E2] flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#1A1C19] text-[#FFFFFF] px-6 py-3 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#8A9A5B] transition-colors flex items-center gap-2 shadow-xs"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Confirm Reset Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Reset to Factory Data"
        message="This will restore all default artwork, subscribers, messages, and settings. Any custom changes created in this session will be replaced with the original initial dataset."
        confirmLabel="Reset Everything"
        onConfirm={handleResetDefaults}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
};
