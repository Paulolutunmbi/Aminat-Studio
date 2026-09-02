import { Artwork } from '../types';

const DEFAULT_API_BASE = '/api';
const PRODUCTION_API_BASE = 'https://aminat-studio-backend.onrender.com/api';

const apiBaseUrl = (() => {
  const env = (import.meta as any).env || {};
  const configured = (env.VITE_API_URL as string | undefined)?.trim();
  if (configured) {
    const normalized = configured.replace(/\/$/, '');
    return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
  }

  return env.PROD ? PRODUCTION_API_BASE : DEFAULT_API_BASE;
})();

const buildUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${apiBaseUrl}${normalizedPath}`;
};

const normalizeArtwork = (item: any): Artwork => {
  const normalizedId = item?._id || item?.id || `art-${Date.now()}`;
  const imageValue = item?.imageUrl || item?.image || '';

  return {
    id: String(normalizedId),
    title: typeof item?.title === 'string' ? item.title : '',
    image: typeof imageValue === 'string' ? imageValue : '',
    imageUrl: typeof imageValue === 'string' ? imageValue : '',
    medium: typeof item?.medium === 'string' ? item.medium : '',
    description: typeof item?.description === 'string' ? item.description : '',
    category: typeof item?.category === 'string' ? item.category : '',
    featured: Boolean(item?.featured),
    createdAt: typeof item?.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
    year: item?.year !== undefined && item?.year !== null ? String(item.year) : undefined,
    dimensions: typeof item?.dimensions === 'string' ? item.dimensions : undefined,
    order: item?.order !== undefined && item?.order !== null ? Number(item.order) : undefined,
    sortOrder: item?.sortOrder !== undefined && item?.sortOrder !== null ? Number(item.sortOrder) : undefined,
  };
};

const parseApiResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return undefined as T;
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = typeof payload?.message === 'string' ? payload.message : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (payload === null) {
    throw new Error('The backend returned an invalid response. Please try again.');
  }

  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as any).data as T;
  }

  return (payload as T) ?? (undefined as T);
};

const apiRequest = async <T>(path: string, options: RequestInit = {}, includeCredentials = false): Promise<T> => {
  try {
    const response = await fetch(buildUrl(path), {
      ...options,
      ...(includeCredentials ? { credentials: 'include' as RequestCredentials } : {}),
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    return parseApiResponse<T>(response);
  } catch (error) {
    if (error instanceof Error && error.message !== 'Failed to fetch') {
      throw error;
    }

    throw new Error('Unable to reach the backend. It may be starting up; please try again shortly.');
  }
};

type ApiResponse<T> = T & { success?: boolean; message?: string; authenticated?: boolean };

export const api = {
  getArtworks: async (): Promise<Artwork[]> => {
    const payload = await apiRequest<ApiResponse<{ data?: any[] }>>('/artworks');
    const records = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];
    return records.map(normalizeArtwork);
  },

  getArtworkById: async (id: string): Promise<Artwork | null> => {
    const payload = await apiRequest<ApiResponse<{ data?: any }>>('/artworks/' + id);
    return payload && payload.data ? normalizeArtwork(payload.data) : null;
  },

  createArtwork: async (payload: Partial<Artwork> & Record<string, any>): Promise<Artwork> => {
    const body = { ...payload };
    if (body.image && !body.imageUrl) body.imageUrl = body.image;
    if (body.imageUrl && !body.image) body.image = body.imageUrl;

    const result = await apiRequest<ApiResponse<{ data?: any }>>('/artworks', {
      method: 'POST',
      body: JSON.stringify(body),
    }, true);

    return result && result.data ? normalizeArtwork(result.data) : normalizeArtwork(body);
  },

  updateArtwork: async (id: string, payload: Partial<Artwork> & Record<string, any>): Promise<Artwork> => {
    const body = { ...payload };
    if (body.image && !body.imageUrl) body.imageUrl = body.image;
    if (body.imageUrl && !body.image) body.image = body.imageUrl;

    const result = await apiRequest<ApiResponse<{ data?: any }>>('/artworks/' + id, {
      method: 'PUT',
      body: JSON.stringify(body),
    }, true);

    return result && result.data ? normalizeArtwork(result.data) : normalizeArtwork(body);
  },

  deleteArtwork: async (id: string): Promise<boolean> => {
    await apiRequest('/artworks/' + id, { method: 'DELETE' }, true);
    return true;
  },

  toggleFeatured: async (id: string): Promise<Artwork> => {
    const result = await apiRequest<ApiResponse<{ data?: any }>>('/artworks/' + id + '/toggle-featured', {
      method: 'PATCH',
    }, true);

    return result && result.data ? normalizeArtwork(result.data) : normalizeArtwork({ id });
  },

  updateArtworkOrder: async (artworkId: string, order: number): Promise<Artwork> => {
    const result = await apiRequest<ApiResponse<{ data?: any }>>('/artworks/' + artworkId, {
      method: 'PUT',
      body: JSON.stringify({ order, sortOrder: order }),
    }, true);

    return result && result.data ? normalizeArtwork(result.data) : normalizeArtwork({ id: artworkId, order, sortOrder: order });
  },

  getSettings: async (): Promise<{ studioName: string; artistName: string; description: string; email: string; youtube: string; tiktok: string; profileImage: string }> => {
    const result = await apiRequest<ApiResponse<{ data?: any }>>('/settings');
    const data = result && result.data ? result.data : {};
    return {
      studioName: typeof data.studioName === 'string' ? data.studioName : 'Aminat Studio',
      artistName: typeof data.artistName === 'string' ? data.artistName : 'Aminat',
      description: typeof data.description === 'string' ? data.description : 'An emerging, self-taught artist inspired by nature.',
      email: typeof data.email === 'string' ? data.email : 'aminatstudio0@gmail.com',
      youtube: typeof data.youtube === 'string' ? data.youtube : '',
      tiktok: typeof data.tiktok === 'string' ? data.tiktok : '',
      profileImage: typeof data.profileImage === 'string' ? data.profileImage : '/images/profile/aminat-profile.jpg',
    };
  },

  updateSettings: async (payload: Record<string, any>): Promise<any> => {
    return apiRequest('/settings', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }, true);
  },

  getAdminStatus: async (): Promise<{ authenticated: boolean }> => {
    return apiRequest<{ authenticated: boolean }>('/admin/status', {}, true);
  },

  setupAdmin: async (newPassword: string, confirmPassword: string): Promise<{ success: boolean; message?: string }> => {
    return apiRequest<{ success: boolean; message?: string }>('/admin/setup', {
      method: 'POST',
      body: JSON.stringify({ newPassword, confirmPassword }),
    });
  },

  loginAdmin: async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    return apiRequest<{ success: boolean; message?: string }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }, true);
  },

  logoutAdmin: async (): Promise<{ success: boolean; message?: string }> => {
    return apiRequest<{ success: boolean; message?: string }>('/admin/logout', {
      method: 'POST',
    }, true);
  },

  forgotPassword: async (email: string): Promise<{ success: boolean; message?: string }> => {
    return apiRequest<{ success: boolean; message?: string }>('/admin/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ success: boolean; message?: string }> => {
    return apiRequest<{ success: boolean; message?: string }>('/admin/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  },
};

export { buildUrl, normalizeArtwork };
