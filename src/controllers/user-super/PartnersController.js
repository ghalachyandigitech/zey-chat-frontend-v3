import {Axios} from '../../Axios'
import Joi from "joi";
import {socket} from "../../Socket";
import {_ID_PATTERN} from "../../Constants";

const _id = Joi.string().regex(_ID_PATTERN).required();
const name = Joi.string().min(3).max(64).required();
const file = Joi.number().min(0).max(3).required();
const userAdminsIds = Joi.array().items(Joi.string().regex(_ID_PATTERN));
const status = Joi.number().min(0).max(1).required();
const request = Joi.number().min(0).max(1).required();

export function getPartners(){
    return Axios.get('user-super/partners');
}

export function create(data){
    const {error} = Joi.object({name, userAdminsIds, file})
        .validate(data, {abortEarly: false});

    if(error) return [error.details.reduce((e, i) => {e[i.context.key] = i.message; return e}, {}), {}];

    return Axios.post('user-super/partners', data);
}

export function setRequest(data){
    const {error} = Joi.object({request})
        .validate(data, {abortEarly: false});

    if(error) return [error.details.reduce((e, i) => {e[i.context.key] = i.message; return e}, {})];

    return socket.emit('admins.set.request', data.request);
}

export function update(data){
    const {error} = Joi.object({_id, name, userAdminsIds, file})
        .validate(data, {abortEarly: false});

    if(error) return [error.details.reduce((e, i) => {e[i.context.key] = i.message; return e}, {}), {}];

    return Axios.put('user-super/partners', data, {params: {_id: data._id}});
}

export function updateStatus(data){
    const {error} = Joi.object({_id, status})
        .validate(data, {abortEarly: false});

    if(error) return [error.details.reduce((e, i) => {e[i.context.key] = i.message; return e}, {}), {}];

    return Axios.put('user-super/partners/status', data, {params: {_id: data._id}});
}

export function deletePartnerById(data){
    const {error} = Joi.object({_id})
        .validate(data, {abortEarly: false});

    if(error) return [error.details.reduce((e, i) => {e[i.context.key] = i.message; return e}, {}), {}];

    return Axios.delete('user-super/partners', {params: data});
}