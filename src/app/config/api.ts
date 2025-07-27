const API_CONFIG = {
  BASE_URL: 'https://www.arthurportfolio.com',
  ENDPOINTS: {
    VALUES: '/values/values.json',
    IMAGES: '/images/me.jpg'
  }
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export default API_CONFIG; 