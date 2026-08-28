import { Artwork, NaturePhoto, Subscriber, Message, StudioSettings } from '../types';
import {
  INITIAL_ARTWORKS,
  INITIAL_PHOTOS,
  INITIAL_SUBSCRIBERS,
  INITIAL_MESSAGES,
  INITIAL_SETTINGS,
} from '../data/initialData';

const STORAGE_KEYS = {
  ARTWORKS: 'aminat_studio_artworks_v1',
  SUBSCRIBERS: 'aminat_studio_subscribers_v1',
  MESSAGES: 'aminat_studio_messages_v1',
  SETTINGS: 'aminat_studio_settings_v1',
};

function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

// Simulates network latency for realistic feel
const delay = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

export const dataService = {
  // --- Artworks ---
  async getArtworks(): Promise<Artwork[]> {
    await delay();
    return getStored<Artwork[]>(STORAGE_KEYS.ARTWORKS, INITIAL_ARTWORKS);
  },

  async getFeaturedArtworks(): Promise<Artwork[]> {
    const artworks = await this.getArtworks();
    return artworks.filter((a) => a.featured);
  },

  async getArtworkById(id: string): Promise<Artwork | null> {
    const artworks = await this.getArtworks();
    return artworks.find((a) => a.id === id) || null;
  },

  async createArtwork(data: Omit<Artwork, 'id' | 'createdAt'>): Promise<Artwork> {
    await delay();
    const artworks = await this.getArtworks();
    const newArtwork: Artwork = {
      ...data,
      id: `art-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newArtwork, ...artworks];
    setStored(STORAGE_KEYS.ARTWORKS, updated);
    return newArtwork;
  },

  async updateArtwork(id: string, updates: Partial<Artwork>): Promise<Artwork> {
    await delay();
    const artworks = await this.getArtworks();
    const index = artworks.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Artwork not found');
    const updatedArtwork = { ...artworks[index], ...updates };
    artworks[index] = updatedArtwork;
    setStored(STORAGE_KEYS.ARTWORKS, [...artworks]);
    return updatedArtwork;
  },

  async deleteArtwork(id: string): Promise<boolean> {
    await delay();
    const artworks = await this.getArtworks();
    const filtered = artworks.filter((a) => a.id !== id);
    setStored(STORAGE_KEYS.ARTWORKS, filtered);
    return true;
  },

  async toggleFeatured(id: string): Promise<Artwork> {
    await delay();
    const artworks = await this.getArtworks();
    const index = artworks.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Artwork not found');
    artworks[index].featured = !artworks[index].featured;
    setStored(STORAGE_KEYS.ARTWORKS, [...artworks]);
    return artworks[index];
  },

  // --- Reference Photos ---
  async getPhotos(): Promise<NaturePhoto[]> {
    return INITIAL_PHOTOS;
  },

  // --- Subscribers ---
  async getSubscribers(): Promise<Subscriber[]> {
    await delay();
    return getStored<Subscriber[]>(STORAGE_KEYS.SUBSCRIBERS, INITIAL_SUBSCRIBERS);
  },

  async addSubscriber(email: string): Promise<{ success: boolean; message: string }> {
    await delay();
    const trimmed = email.trim().toLowerCase();
    const subscribers = await this.getSubscribers();
    if (subscribers.some((s) => s.email.toLowerCase() === trimmed)) {
      return { success: false, message: 'This email is already subscribed.' };
    }
    const newSub: Subscriber = {
      id: `sub-${Date.now()}`,
      email: trimmed,
      subscribedAt: new Date().toISOString(),
    };
    setStored(STORAGE_KEYS.SUBSCRIBERS, [newSub, ...subscribers]);
    return { success: true, message: 'Thank you for subscribing to updates.' };
  },

  async deleteSubscriber(id: string): Promise<boolean> {
    await delay();
    const subscribers = await this.getSubscribers();
    const filtered = subscribers.filter((s) => s.id !== id);
    setStored(STORAGE_KEYS.SUBSCRIBERS, filtered);
    return true;
  },

  // --- Messages ---
  async getMessages(): Promise<Message[]> {
    await delay();
    return getStored<Message[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
  },

  async addMessage(name: string, email: string, message: string): Promise<Message> {
    await delay();
    const messages = await this.getMessages();
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      read: false,
      createdAt: new Date().toISOString(),
    };
    setStored(STORAGE_KEYS.MESSAGES, [newMsg, ...messages]);
    return newMsg;
  },

  async markMessageRead(id: string, read = true): Promise<Message> {
    await delay();
    const messages = await this.getMessages();
    const index = messages.findIndex((m) => m.id === id);
    if (index === -1) throw new Error('Message not found');
    messages[index].read = read;
    setStored(STORAGE_KEYS.MESSAGES, [...messages]);
    return messages[index];
  },

  async deleteMessage(id: string): Promise<boolean> {
    await delay();
    const messages = await this.getMessages();
    const filtered = messages.filter((m) => m.id !== id);
    setStored(STORAGE_KEYS.MESSAGES, filtered);
    return true;
  },

  // --- Settings ---
  async getSettings(): Promise<StudioSettings> {
    await delay();
    return getStored<StudioSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  async updateSettings(settings: Partial<StudioSettings>): Promise<StudioSettings> {
    await delay();
    const current = await this.getSettings();
    const updated = { ...current, ...settings };
    setStored(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // Reset to original data (useful for demonstration/testing)
  async resetToDefaults(): Promise<void> {
    setStored(STORAGE_KEYS.ARTWORKS, INITIAL_ARTWORKS);
    setStored(STORAGE_KEYS.SUBSCRIBERS, INITIAL_SUBSCRIBERS);
    setStored(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
    setStored(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },
};
