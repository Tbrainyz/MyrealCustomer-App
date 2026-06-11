import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : 'http://localhost:5000';

console.log('🔧 Using API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// ── Request interceptor — attach JWT ──────────────────────────────────────────
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response interceptor — handle 401 globally ───────────────────────────────
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─────────────────────────────────────────────────────────────────────────────

export const authAPI = {
  register:       data       => api.post('/auth/register', data),
  login:          (email, password) => api.post('/auth/login', { email, password }),
  me:             ()         => api.get('/auth/me'),
  updateProfile:  data       => api.put('/auth/profile', data),
  changePassword: data       => api.put('/auth/password', data),
  updateApiKeys:  data       => api.put('/auth/api-keys', data),
  updateAvatar:   formData   => api.put('/auth/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

export const usersAPI = {
  getAll:         params     => api.get('/users', { params }),
  getRoles:       ()         => api.get('/users/roles'),
  getById:        id         => api.get(`/users/${id}`),
  create:         data       => api.post('/users', data),
  update:         (id, data) => api.put(`/users/${id}`, data),
  toggleStatus:   id         => api.put(`/users/${id}/toggle-status`),
  resetPassword:  id         => api.put(`/users/${id}/reset-password`),
  delete:         id         => api.delete(`/users/${id}`),
};

export const messagesAPI = {
  send:            data   => api.post('/messages/send', data),
  schedule:        data   => api.post('/messages/schedule', data),
  getLogs:         params => api.get('/messages/logs', { params }),
  getScheduled:    params => api.get('/messages/scheduled', { params }),
  cancelScheduled: id     => api.delete(`/messages/scheduled/${id}`),
};

export const contactsAPI = {
  getAll:   params     => api.get('/contacts', { params }),
  getById:  id         => api.get(`/contacts/${id}`),
  create:   data       => api.post('/contacts', data),
  update:   (id, data) => api.put(`/contacts/${id}`, data),
  delete:   id         => api.delete(`/contacts/${id}`),
  import:   fd         => api.post('/contacts/import', fd, { headers: { 'Content-Type': 'multipart/form-data' } }),
  exportCSV: ()        => api.get('/contacts/export', { responseType: 'blob' }),
};

export const templatesAPI = {
  getAll:  params     => api.get('/templates', { params }),
  create:  data       => api.post('/templates', data),
  update:  (id, data) => api.put(`/templates/${id}`, data),
  delete:  id         => api.delete(`/templates/${id}`),
};

export const dashboardAPI = {
  getStats:        () => api.get('/dashboard/stats'),
  getRecentActivity: () => api.get('/dashboard/activity'),
  getCashFlow:     () => api.get('/dashboard/cashflow'),
};

export const invoicesAPI = {
  getAll:  params     => api.get('/invoices', { params }),
  getById: id         => api.get(`/invoices/${id}`),
  create:  data       => api.post('/invoices', data),
  update:  (id, data) => api.put(`/invoices/${id}`, data),
  delete:  id         => api.delete(`/invoices/${id}`),
  markPaid: id        => api.put(`/invoices/${id}/paid`),
};

export const expensesAPI = {
  getAll:  params     => api.get('/expenses', { params }),
  create:  data       => api.post('/expenses', data),
  update:  (id, data) => api.put(`/expenses/${id}`, data),
  delete:  id         => api.delete(`/expenses/${id}`),
};

export const inventoryAPI = {
  getAll:       params     => api.get('/inventory', { params }),
  getById:      id         => api.get(`/inventory/${id}`),
  create:       data       => api.post('/inventory', data),
  update:       (id, data) => api.put(`/inventory/${id}`, data),
  delete:       id         => api.delete(`/inventory/${id}`),
  addMovement:  data       => api.post('/inventory/movements', data),
  getMovements: params     => api.get('/inventory/movements', { params }),
};

export const paymentsAPI = {
  initialize: data       => api.post('/payments/paystack/initialize', data),
  verify:     data       => api.post('/payments/paystack/verify', data),
  status:     reference  => api.get(`/payments/paystack/status/${encodeURIComponent(reference)}`),
};

export default api;

export const subscriptionAPI = {
  getStatus:   ()     => api.get('/subscription/status'),
  activate:    data   => api.post('/subscription/activate', data),
  devBypass:   secret => api.post('/subscription/dev-bypass', { secret }),
};
