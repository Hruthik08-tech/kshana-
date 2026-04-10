import axios from 'axios';

// Create a basic Axios instance. Interceptors or default auth headers are set in context.
export const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure to adjust port if different
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper for Login
export const loginApi = async (credentials: any) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Helper for Signup
export const signupApi = async (data: any) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

// Helper for Fetch Profile
export const getProfileApi = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};
