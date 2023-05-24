import client from './client';

const getCurrentUser = () => client.get('/api/users/me');

export default { getCurrentUser }