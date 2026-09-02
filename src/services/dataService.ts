import { Artwork, NaturePhoto, Subscriber, Message, StudioSettings } from '../types';
import { INITIAL_PHOTOS, INITIAL_SUBSCRIBERS, INITIAL_MESSAGES, INITIAL_SETTINGS } from '../data/initialData';
import { api } from './api';

export const dataService = {
  async getArtworks(): Promise<Artwork[]> {
    return await api.getArtworks();
  },

  async getFeaturedArtworks(): Promise<Artwork[]> {
    const artworks = await this.getArtworks();
    return artworks.filter((a) => a.featured).sort((a, b) => Number(a.order ?? a.sortOrder ?? 0) - Number(b.order ?? b.sortOrder ?? 0));
  },

  async getArtworkById(id: string): Promise<Artwork | null> {
    return await api.getArtworkById(id);
  },

  async createArtwork(data: Partial<Artwork> & Record<string, any>): Promise<Artwork> {
    return api.createArtwork(data);
  },

  async updateArtwork(id: string, updates: Partial<Artwork> & Record<string, any>): Promise<Artwork> {
    return api.updateArtwork(id, updates);
  },

  async deleteArtwork(id: string): Promise<boolean> {
    return api.deleteArtwork(id);
  },

  async toggleFeatured(id: string): Promise<Artwork> {
    return api.toggleFeatured(id);
  },

  async reorderArtwork(id: string, newOrder: number): Promise<Artwork> {
    return api.updateArtworkOrder(id, newOrder);
  },

  async getPhotos(): Promise<NaturePhoto[]> {
    return INITIAL_PHOTOS;
  },

  async getSubscribers(): Promise<Subscriber[]> {
    return [];
  },

  async addSubscriber(email: string): Promise<{ success: boolean; message: string }> {
    return {
      success: false,
      message: 'Newsletter signup is temporarily disabled while production email delivery is being configured.',
    };
  },

  async deleteSubscriber(id: string): Promise<boolean> {
    return true;
  },

  async getMessages(): Promise<Message[]> {
    return [];
  },

  async addMessage(name: string, email: string, message: string): Promise<Message> {
    return {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      read: false,
      createdAt: new Date().toISOString(),
    };
  },

  async markMessageRead(id: string, read = true): Promise<Message> {
    return { id, name: 'Message', email: '', message: '', read, createdAt: new Date().toISOString() };
  },

  async deleteMessage(id: string): Promise<boolean> {
    return true;
  },

  async getSettings(): Promise<StudioSettings> {
    const settings = await api.getSettings();
    return {
      studioName: settings.studioName || INITIAL_SETTINGS.studioName,
      artistName: settings.artistName || INITIAL_SETTINGS.artistName,
      description: settings.description || INITIAL_SETTINGS.description,
      email: settings.email || 'aminatstudio0@gmail.com',
      youtube: settings.youtube || '',
      tiktok: settings.tiktok || '',
      profileImage: settings.profileImage || INITIAL_SETTINGS.profileImage,
    };
  },

  async updateSettings(settings: Partial<StudioSettings>): Promise<StudioSettings> {
    const result = await api.updateSettings(settings);
    const data = result && result.data ? result.data : settings;
    return {
      studioName: data.studioName || INITIAL_SETTINGS.studioName,
      artistName: data.artistName || INITIAL_SETTINGS.artistName,
      description: data.description || INITIAL_SETTINGS.description,
      email: data.email || 'aminatstudio0@gmail.com',
      youtube: data.youtube || '',
      tiktok: data.tiktok || '',
      profileImage: data.profileImage || INITIAL_SETTINGS.profileImage,
    };
  },

  async resetToDefaults(): Promise<void> {
    return undefined;
  },
};
