import {Axios} from "../../Axios";
import {Response} from '../../Controller';
import Joi from 'joi';

const token = Joi.string().required();
const email = Joi.string().email({tlds:{allow: false}}).required();
const status = Joi.number().min(2).max(4).required();
const key = Joi.string().required();
const password = Joi.string().min(6).max(32).required();
const confirmPassword = Joi.any().equal(Joi.ref('password')).messages({'any.only': 'confirm password does not match password'});

export function resetToken(token){
    return Axios.get('users/reset-token', {params: {token: token}});
}

export function forgotPassword(data){
    const {error} = Joi.object({email})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.post('users/forgot-password', data);
}

export async function createPassword(data){
    const {error} = Joi.object({token, password, confirmPassword})
        .validate(data, {abortEarly: false});

    if(error) return Response({error});

    const response = await Axios.post('users/create-password', data);
    const [responseError, payload] = response;

    if(Object.keys(responseError).length) return response;

    const {accessToken, user} = payload;

    localStorage.setItem('accessToken', accessToken);
    Axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

    return Response({payload: user});
}

export async function userPartnerLogin(data){
    const {error} = Joi.object({key, status})
        .validate(data, {abortEarly: false});

    if(error) return false;

    const [responseError, {accessToken}] = await Axios.post('users/user-partner-login', data);

    if(Object.keys(responseError).length) return false;

    localStorage.setItem(data.key, accessToken);

    return true;
}

export async function login(data){
    const {error} = Joi.object({email, password})
        .validate(data, {abortEarly: false});

    if(error) return Response({error});

    const response = await Axios.post('users/login', data);
    const [responseError, payload] = response;

    if(Object.keys(responseError).length) return response;

    const {accessToken, user} = payload;

    localStorage.setItem('accessToken', accessToken);
    Axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

    return Response({payload: user});
}

export async function auth(){
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return false;

    const [error, payload] = await Axios.get('users/sign-in', {headers: {"Authorization": `Bearer ${accessToken}`}});

    if(Object.keys(error).length) return false;

    Axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

    return payload;
}

export async function logOut(){
    const [error] = await Axios.get('users/logout');

    if(Object.keys(error).length) return false;

    localStorage.removeItem('accessToken');
    Axios.defaults.headers['Authorization'] = ``;

    return true;
}

export function getUserPartners(){
    return Axios.get('users/user-partners');
}