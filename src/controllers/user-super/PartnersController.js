import {Axios} from '../../Axios'
import Joi from "joi";
import {socket} from "../../Socket";
import {_ID_PATTERN} from "../../Constants";
import {Response} from '../../Controller';

const routeBase = 'user-super/partners/';
const _id = Joi.string().regex(_ID_PATTERN).required();
const name = Joi.string().min(3).max(64).required();
const file = Joi.number().min(0).max(3).required();
const userAdminsIds = Joi.array().items(Joi.string().regex(_ID_PATTERN));
const status = Joi.number().min(0).max(1).required();
const request = Joi.number().min(0).max(1).required();

export function getPartners(){
    return Axios.get(routeBase);
}

export function create(data){
    const {error} = Joi.object({name, userAdminsIds, file})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.post(routeBase, data);
}

export function setRequest(data){
    const {error} = Joi.object({request})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : socket.emit('admins.set.request', data.request);
}

export function update(data){
    const {error} = Joi.object({_id, name, userAdminsIds, file})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.put(routeBase, data, {params: {_id: data._id}});
}

export function updateStatus(data){
    const {error} = Joi.object({_id, status})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.put(routeBase + 'status', data, {params: {_id: data._id}});
}

export function deletePartnerById(data){
    const {error} = Joi.object({_id})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.delete(routeBase, {params: data});
}