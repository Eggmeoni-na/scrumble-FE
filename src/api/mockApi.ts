import { Squad } from '@/types';
import axios from 'axios';

const mockBaseUrl = '/mock-api';
const mockInstance = axios.create({
  baseURL: mockBaseUrl,
});

export const getTest = async () => {
  const response = await mockInstance.get('/post');
  return response;
};

export const getSquadApi = async (): Promise<{ data: Squad[] }> => {
  const response = await mockInstance.get('/squads');
  return response.data;
};
