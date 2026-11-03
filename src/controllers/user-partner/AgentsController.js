import {Axios} from '../../Axios';
import {Response} from '../../Controller';
import {socket} from '../../Socket';
import Joi from 'joi';
import {_ID_PATTERN} from "../../Constants";

const userPartnerId = Joi.string().regex(_ID_PATTERN).required();
const name = Joi.string().min(3).max(32).required();
const email = Joi.string().email({tlds:{allow: false}}).required();
const role = Joi.number().min(2).max(3);
const limit = Joi.number().min(1).max(10).required();
const status = Joi.number().min(0).max(1).required();

const routeBase = 'user-partners/agents/';

export function get(){
    return Axios.get(routeBase);
}

export function create(data){
    const {error} = Joi.object({name, email, role, limit})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.post(routeBase, data);
}

export function deleteById(data){
    const {error} = Joi.object({userPartnerId})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.delete(routeBase, {params: data});
}

export function agentInactive(data){
    const {error} = Joi.object({userPartnerId, status})
        .validate(data, {abortEarly: false});

    if(!error) socket.emit('agents.inactive', [data.userPartnerId, data.status]);
}

export function agentLogout(data){
    const {error} = Joi.object({userPartnerId})
        .validate(data, {abortEarly: false});

    if(!error) socket.emit('agents.logout', data.userPartnerId);
}

export function teamLeadsUpdate(data){
    const {error} = Joi.object({userPartnerId, name, limit})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.put(routeBase + 'team-leads',
        data, {params: {userPartnerId: data.userPartnerId}}
    );
}

export function adminsUpdate(data){
    const {error} = Joi.object({userPartnerId, name, limit, role, email})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.put(routeBase + 'admins',
        data, {params: {userPartnerId: data.userPartnerId}}
    );
}