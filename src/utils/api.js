import axios from 'axios';
import Cookies from 'js-cookie';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://templify-uqbl.onrender.com/api',
  //baseURL: 'http://localhost:5001/api',
  timeout: 60000,
});

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Access Token was expired
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${api.defaults.baseURL}/auth/refresh`, { refreshToken });

          if (response.status === 200) {
            const { token } = response.data;
            Cookies.set('token', token, { expires: 7 }); // Update access token

            // Update the header of the failed request
            originalRequest.headers['Authorization'] = `Bearer ${token}`;

            // Retry the original request
            return api(originalRequest);
          }
        }
      } catch (err) {
        // Refresh token failed, logout user
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        window.location.href = '/auth'; // Force logout
      }
    }
    return Promise.reject(error);
  }
);

// Function to get auth headers
const getAuthHeaders = () => {
  const token = Cookies.get('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile', { headers: getAuthHeaders() }),
  // New function to get all users for sharing dropdown
  getAllUsers: () => api.get('/auth/users', { headers: getAuthHeaders() }),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
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

// Template Sharing API
export const shareAPI = {
  shareTemplate: (templateId, recipientEmail) =>
    api.post(`/share/templates/${templateId}/share`, { recipientEmail }, { headers: getAuthHeaders() }),
  getSharedTemplates: () => api.get('/share/templates/shared', { headers: getAuthHeaders() }),
  respondToShare: (templateId, action) =>
    api.put(`/share/templates/${templateId}/respond`, { action }, { headers: getAuthHeaders() }),
  getPendingShares: () => api.get('/share/templates/shared/pending', { headers: getAuthHeaders() }),
};

export default api;