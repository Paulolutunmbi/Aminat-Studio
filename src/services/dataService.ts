import { Artwork, NaturePhoto, Subscriber, Message, StudioSettings } from '../types';
import { INITIAL_PHOTOS, INITIAL_SUBSCRIBERS, INITIAL_MESSAGES, INITIAL_SETTINGS } from '../data/initialData';
import { api } from './api';

export const dataService = {
  async getArtworks(): Promise<Artwork[]> {
    try {
      return await api.getArtworks();
    } catch (error) {
      console.error('Failed to fetch artworks from API:', error);
      return [];
    }
  },

  async getFeaturedArtworks(): Promise<Artwork[]> {
    const artworks = await this.getArtworks();
    return artworks.filter((a) => a.featured);
  },

  async getArtworkById(id: string): Promise<Artwork | null> {
    try {
      return await api.getArtworkById(id);
    } catch (error) {
      console.error('Failed to fetch artwork by id:', error);
      return null;
    }
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

  async getPhotos(): Promise<NaturePhoto[]> {
    return INITIAL_PHOTOS;
  },

  async getSubscribers(): Promise<Subscriber[]> {
    return INITIAL_SUBSCRIBERS;
  },

  async addSubscriber(email: string): Promise<{ success: boolean; message: string }> {
    return { success: true, message: 'Thank you for subscribing to updates.' };
  },

  async deleteSubscriber(id: string): Promise<boolean> {
    return true;
  },

  async getMessages(): Promise<Message[]> {
    return INITIAL_MESSAGES;
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
    return INITIAL_SETTINGS;
  },

  async updateSettings(settings: Partial<StudioSettings>): Promise<StudioSettings> {
    return { ...INITIAL_SETTINGS, ...settings };
  },

  async resetToDefaults(): Promise<void> {
    return undefined;
  },
};
