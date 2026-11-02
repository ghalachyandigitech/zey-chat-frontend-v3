import {Axios} from "../../Axios";
import Joi from 'joi';

const username = Joi.string().min(3).max(32).required();
const password = Joi.string().min(3).max(32).required();

export async function login(data){
    const {error} = Joi.object({username, password})
        .validate(data, {abortEarly: false});

    if(error) return [error.details.reduce((e, i) => {e[i.context.key] = i.message; return e}, {})];

    const [errors, {accessSToken, user}] = await Axios.post('user-super/login', data);

    if(Object.keys(errors).length) return [errors, {}];

    localStorage.setItem('accessSToken', accessSToken);
    Axios.defaults.headers['Authorization'] = `Bearer ${accessSToken}`;

    return [{}, user];
}

export function home(){
    return Axios.get('user-super/home');
}

export function logOut(){
    localStorage.removeItem('accessSToken');
    Axios.defaults.headers['Authorization'] = '';
}

export async function auth(){
    const accessSToken = localStorage.getItem('accessSToken');
    if(!accessSToken) return false;

    const [error, payload] = await Axios.get('user-super/sign-in', {headers: {"Authorization": `Bearer ${accessSToken}`}});

    if(Object.keys(error).length) return false;

    Axios.defaults.headers['Authorization'] = `Bearer ${accessSToken}`;

    return payload;
}
