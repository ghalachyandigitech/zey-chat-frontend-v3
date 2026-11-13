import {Axios} from "../../Axios";
import Joi from 'joi';
import {_ID_PATTERN} from "../../Constants";
import {Response} from "../../Controller";

const routeBase = 'user-super/user-admins/';
const _id = Joi.string().regex(_ID_PATTERN).required();
const name = Joi.string().min(3).max(32).required();
const companyName = Joi.string().min(3).max(32).required();
const phone = Joi.string().regex(/^\d+$/).message('"number" is allowed to be only number').required();
const email = Joi.string().email({tlds:{allow: false}}).required();

export function createUserAdmin(data){
    const {error} = Joi.object({name, companyName, phone, email}).validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.post(routeBase, data);
}

export function updateUserAdmin(data){
    const {error} = Joi.object({_id, name, companyName, phone, email}).validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.put(routeBase, data, {params: {_id: data._id}});
}

export function resetPasswordUserAdmin(data){
    const {error} = Joi.object({_id}).validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.put(routeBase + 'reset-password', data, {params: {_id: data._id}});
}

export function getUserAdmins(){
    return Axios.get(routeBase);
}

export function deleteUserAdminById(data){
    const {error} = Joi.object({_id})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.delete(routeBase, {params: data});
}
