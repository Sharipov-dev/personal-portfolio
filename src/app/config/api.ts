const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005',
  ENDPOINTS: {
    VALUES: '/values/values.json',
    IMAGES: '/images/me.jpg'
  }
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export default API_CONFIG; 