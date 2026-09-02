import { Artwork, NaturePhoto, Subscriber, Message, StudioSettings } from '../types';

export const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: 'art-1',
    title: 'Floral Abstraction',
    image: '/images/artwork/floral-abstraction.jpg',
    medium: 'Acrylic on Canvas',
    description: 'An exploration of organic forms, vibrant botanical motifs, and imaginative floral silhouettes against a textured warm background.',
    category: 'Acrylic',
    featured: true,
    createdAt: '2023-11-15',
    year: '2023',
    dimensions: '16 x 20 in',
  },
  {
    id: 'art-2',
    title: 'The Path',
    image: '/images/artwork/the-path.jpg',
    medium: 'Watercolor',
    description: 'A quiet study of an arched woodland canopy creating a tunnel of green foliage above a winding road with delicate dappled light.',
    category: 'Watercolour',
    featured: true,
    createdAt: '2023-08-20',
    year: '2023',
    dimensions: '11 x 14 in',
  },
  {
    id: 'art-3',
    title: 'Surreal Landscape',
    image: '/images/artwork/surreal-landscape.jpg',
    medium: 'Mixed Media',
    description: 'An imaginative composition featuring a sweeping curved path flanked by a prominent tree canopy, open grassy hill, and wildflower textures.',
    category: 'Mixed Media',
    featured: true,
    createdAt: '2024-02-10',
    year: '2024',
    dimensions: '18 x 24 in',
  },
  {
    id: 'art-4',
    title: "The Artist's Journey",
    image: '/images/artwork/artists-journey.jpg',
    medium: 'Pen & Watercolour',
    description: 'A reflective profile silhouette where the human contour is mapped into a mountain landscape, flowing water, and emerging blossom.',
    category: 'Pen',
    featured: false,
    createdAt: '2024-04-18',
    year: '2024',
    dimensions: '12 x 16 in',
  },
  {
    id: 'art-5',
    title: 'Paint With Me - Studio Study',
    image: '/images/artwork/paint-with-me.jpg',
    medium: 'Watercolour',
    description: 'A personal studio notebook painting capturing a warm horizon over green grass, recorded during a live watercolor painting session.',
    category: 'Watercolour',
    featured: false,
    createdAt: '2024-06-02',
    year: '2024',
    dimensions: '8 x 10 in',
  },
];

export const INITIAL_PHOTOS: NaturePhoto[] = [
  {
    id: 'photo-1',
    title: 'Wild Asters & Bumblebee',
    image: '/images/photography/purple-wildflowers.jpg',
    caption: 'Reference Photography',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'photo-2',
    title: 'Sunlit Calendula Blossom',
    image: '/images/photography/calendula-flower.jpg',
    caption: 'Reference Photography',
    aspect: 'aspect-[3/4]',
  },
];

export const INITIAL_SUBSCRIBERS: Subscriber[] = [
  {
    id: 'sub-1',
    email: 'hannah.clark@example.com',
    subscribedAt: '2024-05-12T14:22:00Z',
  },
  {
    id: 'sub-2',
    email: 'marcus.natureart@example.com',
    subscribedAt: '2024-06-03T09:15:00Z',
  },
  {
    id: 'sub-3',
    email: 'layla.b@example.org',
    subscribedAt: '2024-07-21T18:40:00Z',
  },
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    message: 'Hello Aminat! I came across "The Path" and found the composition so peaceful. I would love to know if you plan on creating more works exploring tree canopy perspectives.',
    read: false,
    createdAt: '2024-08-14T11:30:00Z',
  },
  {
    id: 'msg-2',
    name: 'David O’Connor',
    email: 'david.oc@example.com',
    message: 'Your piece "Floral Abstraction" has such wonderful energy and warmth. Your story about returning to art after graduating was deeply inspiring.',
    read: true,
    createdAt: '2024-08-02T16:05:00Z',
  },
];

export const INITIAL_SETTINGS: StudioSettings = {
  studioName: 'Aminat Studio',
  artistName: 'Aminat',
  description: 'An emerging, self-taught artist inspired by nature.',
  email: 'aminatstudio0@gmail.com',
  youtube: 'https://youtube.com/@amesmeenah26',
  tiktok: 'https://www.tiktok.com/@m.nh1450',
  profileImage: '/images/profile/aminat-profile.jpg',
};
