import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://your-production-backend.com' // Replace with your production backend URL
        : 'http://localhost:3000', // Local backend URL
    withCredentials: true, // Allow cookies and headers
});

export default api;
