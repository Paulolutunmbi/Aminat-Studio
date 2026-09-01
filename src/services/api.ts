import { Artwork } from '../types';

const DEFAULT_API_BASE = 'http://localhost:5000/api';

const apiBaseUrl = (() => {
  const configured = ((import.meta as any).env?.VITE_API_URL as string | undefined)?.trim();
  if (configured) {
    return configured.replace(/\/$/, '');
  }

  return DEFAULT_API_BASE;
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
  };
};

const parseApiResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return undefined as T;
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as any).data as T;
  }

  return (payload as T) ?? (undefined as T);
};

const apiRequest = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(buildUrl(path), {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  return parseApiResponse<T>(response);
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
    });

    return result && result.data ? normalizeArtwork(result.data) : normalizeArtwork(body);
  },

  updateArtwork: async (id: string, payload: Partial<Artwork> & Record<string, any>): Promise<Artwork> => {
    const body = { ...payload };
    if (body.image && !body.imageUrl) body.imageUrl = body.image;
    if (body.imageUrl && !body.image) body.image = body.imageUrl;

    const result = await apiRequest<ApiResponse<{ data?: any }>>('/artworks/' + id, {
      method: 'PUT',
      body: JSON.stringify(body),
    });

    return result && result.data ? normalizeArtwork(result.data) : normalizeArtwork(body);
  },

  deleteArtwork: async (id: string): Promise<boolean> => {
    await apiRequest('/artworks/' + id, { method: 'DELETE' });
    return true;
  },

  toggleFeatured: async (id: string): Promise<Artwork> => {
    const result = await apiRequest<ApiResponse<{ data?: any }>>('/artworks/' + id + '/toggle-featured', {
      method: 'PATCH',
    });

    return result && result.data ? normalizeArtwork(result.data) : normalizeArtwork({ id });
  },

  getAdminStatus: async (): Promise<{ authenticated: boolean }> => {
    return apiRequest<{ authenticated: boolean }>('/admin/status');
  },

  loginAdmin: async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    return apiRequest<{ success: boolean; message?: string }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  logoutAdmin: async (): Promise<{ success: boolean; message?: string }> => {
    return apiRequest<{ success: boolean; message?: string }>('/admin/logout', {
      method: 'POST',
    });
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
