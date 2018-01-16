const getEnv = () => {
  if (typeof window !== 'undefined' &&
    typeof window.__ENV__ !== 'undefined') {
    return window.__ENV__;
  }

  return process.env;
};

const env = getEnv();

const {
  API_BASE_URL,
  AUTH0_DOMAIN
} = env;

const config = {
  pageSize: 24,
  reviewsPerPage:13,
  reviews: {
    api: `${API_BASE_URL}`,
  },
  auth0: {
    domain: AUTH0_DOMAIN
  }
};
export default config;
