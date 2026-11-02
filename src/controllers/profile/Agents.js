import {Axios} from '../../Axios';
import {Response} from '../../Controller';
import Joi from 'joi';

const name = Joi.string().min(3).max(32).required();
const email = Joi.string().email({tlds:{allow: false}}).required();
const flagName = Joi.string().valid('messageFlag', 'requestFlag').required();
const flagValue = Joi.number().min(0).max(1);

export function updateNotification(data){
    const {error} = Joi.object({flagName, flagValue})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.put('user-partners/notifications', data);
}

export function update(data){
    const {error} = Joi.object({name, email})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.put('user-partners', data);
}