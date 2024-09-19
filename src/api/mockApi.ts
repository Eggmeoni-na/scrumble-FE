import axios from 'axios';

const mockBaseUrl = '/mock-api';
const mockInstance = axios.create({
  baseURL: mockBaseUrl,
});

export const getTest = async () => {
  const response = await mockInstance.get('/post');
  return response;
};
