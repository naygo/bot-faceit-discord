import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const faceitOpenClient = axios.create({
  baseURL: 'https://open.faceit.com/data/v4',
  headers: {
    Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
  },
});

export const faceitApiClient = axios.create({
  baseURL: 'https://api.faceit.com',
});
