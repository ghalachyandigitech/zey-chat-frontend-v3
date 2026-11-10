import axios from 'axios';
import {Response} from './Controller';

export const Axios = axios.create({
    baseURL: 'http://localhost:5006/api/v1',
    headers: {
        'Content-Type': 'application/json'
    },
});

Axios.interceptors.response.use(
    config => {
        const {payload} = config.data;

        return Response({payload});
    },
    (error) => {
        const authorization = error.config.headers['Authorization'];
        if(error.response && error.response.status === 401 && authorization){
            const items = {...localStorage};
            const token = authorization.split(' ')[1];

            localStorage.removeItem(Object.keys(items).find(key => items[key] === token));
            window.location.reload();
        }

        return Response({error});
    }
);