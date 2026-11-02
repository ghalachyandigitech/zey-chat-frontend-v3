import {Axios} from '../../Axios';
import {Response} from '../../Controller';
import Joi from 'joi';
import {IMAGE_EXT} from '../../Constants';

const name = Joi.string().min(3).max(32).required();
const email = Joi.string().email({tlds:{allow: false}}).required();
const flagName = Joi.string().valid('messageFlag', 'requestFlag').required();
const flagValue = Joi.number().min(0).max(1);
const profileImage = Joi.string().label('image').valid(...IMAGE_EXT);
const dashboardImage = Joi.string().label('image').valid(...IMAGE_EXT);

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

export function updateProfileImage(file){
    const {error} = Joi.object({profileImage})
        .validate({profileImage: file.type}, {abortEarly: false});

    if(error) return Response({error});

    const formData = new FormData();
    formData.append('profile-image', file);

    return Axios.put('user-partners/profile-image', formData, {headers: {'Content-Type': 'multipart/form-data'}});
}

export function deleteProfileImage(){
    return Axios.delete('user-partners/profile-image');
}

export function updateDashboardImage(file){
    const {error} = Joi.object({dashboardImage})
        .validate({dashboardImage: file.type}, {abortEarly: false});

    if(error) return Response({error});

    const formData = new FormData();
    formData.append('dashboard-image', file);

    return Axios.put('partners/dashboard-image', formData, {headers: {'Content-Type': 'multipart/form-data'}});
}

export function deleteDashboardImage(){
    return Axios.delete('partners/dashboard-image');
}