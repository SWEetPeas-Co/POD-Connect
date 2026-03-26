import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

export async function getEvents() {
    const response = await api.get('/events');
    return response.data;
}

export async function getClubs() {
    const response = await api.get('/clubs');
    return response.data;
}