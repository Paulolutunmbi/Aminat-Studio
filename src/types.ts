export type ArtworkMedium =
  | 'Acrylic'
  | 'Watercolour'
  | 'Paint marker'
  | 'Pen'
  | 'Sketch'
  | 'Mixed Media'
  | string;

export interface Artwork {
  id: string;
  title: string;
  image: string;
  imageUrl?: string;
  medium: ArtworkMedium;
  description: string;
  category: string;
  featured: boolean;
  createdAt: string;
  year?: string;
  dimensions?: string;
}

export interface NaturePhoto {
  id: string;
  title: string;
  image: string;
  caption: string;
  aspect?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface StudioSettings {
  studioName: string;
  artistName: string;
  description: string;
  email: string;
  youtube: string;
  tiktok: string;
  profileImage: string;
}

export interface UserAuth {
  isAuthenticated: boolean;
  username: string | null;
}
