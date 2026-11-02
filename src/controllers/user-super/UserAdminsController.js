import {Axios} from "../../Axios";
import Joi from 'joi';
import {_ID_PATTERN} from "../../Constants";

const _id = Joi.string().regex(_ID_PATTERN).required();
const name = Joi.string().min(3).max(32).required();
const companyName = Joi.string().min(3).max(32).required();
const phone = Joi.string().regex(/^\d+$/).message('"number" is allowed to be only number').required();
const email = Joi.string().email({tlds:{allow: false}}).required();

export function createUserAdmin(data){
    const {error} = Joi.object({name, companyName, phone, email}).validate(data, {abortEarly: false});

    if(error) return [error.details.reduce((e, i) => {e[i.context.key] = i.message; return e}, {}), {}];

    return Axios.post('user-super/user-admins', data);
}

export function updateUserAdmin(data){
    const {error} = Joi.object({_id, name, companyName, phone, email}).validate(data, {abortEarly: false});

    if(error) return [error.details.reduce((e, i) => {e[i.context.key] = i.message; return e}, {}), {}];

    return Axios.put('user-super/user-admins', data, {params: {_id: data._id}});
}

export function resetPasswordUserAdmin(data){
    const {error} = Joi.object({_id}).validate(data, {abortEarly: false});

    if(error) return [error.details.reduce((e, i) => {e[i.context.key] = i.message; return e}, {}), {}];

    return Axios.put('user-super/user-admins/reset-password', data, {params: {_id: data._id}});
}

export function getUserAdmins(){
    return Axios.get('user-super/user-admins');
}

export function deleteUserAdminById(data){
    const {error} = Joi.object({_id})
        .validate(data, {abortEarly: false});

    if(error) return [error.details.reduce((e, i) => {e[i.context.key] = i.message; return e}, {})];

    return Axios.delete('user-super/user-admins', {params: data});
}
