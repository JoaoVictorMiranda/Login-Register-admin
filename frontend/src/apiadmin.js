import axios from 'axios';

const apiAdmin = axios.create({
    baseURL: 'http://localhost:5022',
    headers: {'x-access-token': localStorage.getItem("token-admin")}
});

export default apiAdmin;