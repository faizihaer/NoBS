import axios from 'axios';

const API_URL = 'http://localhost:4000'; // Update with your backend URL

const api = axios.create({
  baseURL: API_URL,
});

export const getGoals = async () => {
  try {
    const response = await api.get('/api/goals');
    return response.data;
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};