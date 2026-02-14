import api from './api';

export const userService = {
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  updateAvatar: async (id, file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.put(`/users/${id}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

