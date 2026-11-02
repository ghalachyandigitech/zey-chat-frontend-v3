import {Axios} from '../../Axios';
import {Response} from '../../Controller';
import Joi from "joi";
import {_ID_PATTERN} from "../../Constants";

const routeBase = 'user-partners/shortcuts/';
const _id = Joi.string().regex(_ID_PATTERN).required();
const tag = Joi.string().min(3).max(64).required();
const message = Joi.string().required();

export function get(){
    return Axios.get(routeBase);
}

export function create(data){
    const {error} = Joi.object({tag, message})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.post(routeBase, data);
}

export function update(data){
    const {error} = Joi.object({_id, tag, message})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.put(routeBase, data, {params: {_id: data._id}});
}

export function deleteById(data){
    const {error} = Joi.object({_id})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.delete(routeBase, {params: data});
}