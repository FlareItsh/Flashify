/**
 * API Service
 * Centralized HTTP client for making API requests using Axios
 */

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from 'axios'
import { API_CONFIG } from '@/config/api'

class ApiService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Request interceptor to add auth token
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const token = this.getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: any) => Promise.reject(error)
    )

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response: any) => response,
      (error: AxiosError<{ message?: string; errors?: any }>) => {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred'
        console.error('API request failed:', errorMessage)

        // Create error object with response data attached
        const enhancedError: any = new Error(errorMessage)
        enhancedError.response = error.response
        enhancedError.status = error.response?.status

        return Promise.reject(enhancedError)
      }
    )
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, { params })
    return response.data
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data, config)
    return response.data
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data, config)
    return response.data
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(endpoint, data, config)
    return response.data
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint, config)
    return response.data
  }

  /**
   * Set authorization token
   */
  setAuthToken(token: string) {
    localStorage.setItem('auth_token', token)
  }

  /**
   * Get authorization token
   */
  getAuthToken(): string | null {
    return localStorage.getItem('auth_token')
  }

  /**
   * Clear authorization token
   */
  clearAuthToken() {
    localStorage.removeItem('auth_token')
  }
}

// Export a singleton instance
export const api = new ApiService()
export default api
