import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile', { headers: getAuthHeaders() }),
};

// Template API
export const templateAPI = {
  getAll: () => api.get('/templates', { headers: getAuthHeaders() }),
  getById: (id) => api.get(`/templates/${id}`, { headers: getAuthHeaders() }),
  create: (templateData) => api.post('/templates', templateData, { headers: getAuthHeaders() }),
  update: (id, templateData) => api.put(`/templates/${id}`, templateData, { headers: getAuthHeaders() }),
  delete: (id) => api.delete(`/templates/${id}`, { headers: getAuthHeaders() }),
};

// Send email function
export const sendTemplateEmail = async (templateId, recipientEmail, subject) => {
  const response = await api.post(`/templates/${templateId}/send`, {
    recipientEmail,
    subject
  }, { headers: getAuthHeaders() });
  return response.data;
};

// Prebuilt Template API
export const prebuiltAPI = {
  getAll: () => api.get('/prebuilt', { headers: getAuthHeaders() }),
  getById: (id) => api.get(`/prebuilt/${id}`, { headers: getAuthHeaders() }),
};

export default api;