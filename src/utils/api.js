import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

// Template API
export const templateAPI = {
  getAll: () => api.get('/templates'),
  getById: (id) => api.get(`/templates/${id}`),
  create: (templateData) => api.post('/templates', templateData),
  update: (id, templateData) => api.put(`/templates/${id}`, templateData),
  delete: (id) => api.delete(`/templates/${id}`),
};

// Prebuilt Template API
export const prebuiltAPI = {
  getAll: () => api.get('/prebuilt'),
  getById: (id) => api.get(`/prebuilt/${id}`),
};

export default api;