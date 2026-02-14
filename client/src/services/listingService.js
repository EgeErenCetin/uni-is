import api from './api';

export const listingService = {
  getListings: async (params = {}) => {
    const response = await api.get('/listings', { params });
    return response.data;
  },

  getListingById: async (id) => {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  },

  createListing: async (listingData) => {
    const response = await api.post('/listings', listingData);
    return response.data;
  },

  updateListing: async (id, listingData) => {
    const response = await api.put(`/listings/${id}`, listingData);
    return response.data;
  },

  deleteListing: async (id) => {
    const response = await api.delete(`/listings/${id}`);
    return response.data;
  },
};

