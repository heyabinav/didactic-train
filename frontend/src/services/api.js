import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const startTestApi = (payload) => api.post('/start-test', payload).then((r) => r.data);
export const submitResultApi = (payload, token) =>
  api
    .post('/submit-result', payload, { headers: { Authorization: `Bearer ${token}` } })
    .then((r) => r.data);
export const leaderboardApi = (range) => api.get(`/leaderboard?range=${range}`).then((r) => r.data);
export const userHistoryApi = (userId) => api.get(`/user-history/${userId}`).then((r) => r.data);
export const signupApi = (payload) => api.post('/auth/signup', payload).then((r) => r.data);
export const loginApi = (payload) => api.post('/auth/login', payload).then((r) => r.data);
