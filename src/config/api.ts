/**
 * API Configuration
 * Centralized API endpoint configuration
 */

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
  timeout: 10000 // 10 seconds
} as const

/**
 * API Endpoints
 * Define all your API endpoints here
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: '/api/login',
    signup: '/api/register',
    logout: '/api/logout',
    me: '/api/me'
  },
  // User endpoints
  users: {
    list: '/api/users',
    create: '/api/users',
    get: (id: string | number) => `/api/users/${id}`,
    update: (id: string | number) => `/api/users/${id}`,
    delete: (id: string | number) => `/api/users/${id}`,
    getByEmail: '/api/users/email',
    getByUsername: (username: string) => `/api/users/username/${username}`
  },
  // Flashcards endpoints (nested under collections)
  flashcards: {
    list: (collectionId: string | number) => `/api/collections/${collectionId}/flashcards`,
    create: (collectionId: string | number) => `/api/collections/${collectionId}/flashcards`,
    get: (collectionId: string | number, id: string | number) =>
      `/api/collections/${collectionId}/flashcards/${id}`,
    update: (collectionId: string | number, id: string | number) =>
      `/api/collections/${collectionId}/flashcards/${id}`,
    delete: (collectionId: string | number, id: string | number) =>
      `/api/collections/${collectionId}/flashcards/${id}`
  },
  // Collections endpoints
  collections: {
    list: '/api/collections',
    create: '/api/collections',
    get: (id: string | number) => `/api/collections/${id}`,
    update: (id: string | number) => `/api/collections/${id}`,
    delete: (id: string | number) => `/api/collections/${id}`
  }
} as const
