import {Axios} from "../../Axios";
import {Response} from "../../Controller";
import Joi from 'joi';
import {_ID_PATTERN, _HEX_PATTERN} from "../../Constants";

const _id = Joi.string().regex(_ID_PATTERN).required();
const name = Joi.string().min(3).max(32).invalid('default').required();
const email = Joi.string().email({tlds:{allow: false}}).required();
const language = Joi.string().min(2).max(2).required();
const notificationSound = Joi.boolean().required();
const isRatingEnabled = Joi.boolean().required();
const offlineGreeting = Joi.boolean().required();
const greetingMessage = Joi.string().allow('');
const styles = {
    chatBadgeBackgroundColor: Joi.string().pattern(_HEX_PATTERN).required(),
    headerLeftColor: Joi.string().pattern(_HEX_PATTERN).required(),
    headerRightColor: Joi.string().pattern(_HEX_PATTERN).required(),
    headerTextColor: Joi.string().allow(''), //todo petq chi esi
    messagesBackgroundColors: Joi.object({
        client: Joi.string().pattern(_HEX_PATTERN).required(),
        our: Joi.string().pattern(_HEX_PATTERN).required()
    }),
    title: Joi.string().allow(''),
    botTextColor: Joi.string().pattern(_HEX_PATTERN).required(),
    widgetType: Joi.string().valid('bar', 'circular').required(),
    headerDegree: Joi.number().min(0).max(360).required(),
    widgetDegree: Joi.number().min(0).max(360).required(),
    visitorTextColor: Joi.string().pattern(_HEX_PATTERN).required(),
    widgetLeftColor: Joi.string().pattern(_HEX_PATTERN).required(),
    widgetRightColor: Joi.string().pattern(_HEX_PATTERN).required(),
    widgetIconColor: Joi.string().pattern(_HEX_PATTERN).required(),
    agentTextColor: Joi.string().pattern(_HEX_PATTERN).required(),
    widgetGradientType: Joi.string().valid('linear-gradient', 'radial-gradient', 'conic-gradient', 'midline-gradient').required(),
    windowSize: Joi.string().valid('overlay', 'popup').required(),
    windowSizeMobile: Joi.string().valid('overlay', 'popup').required(),
    widgetPosition: Joi.string().valid('bottom-right', 'bottom-left').required(),
    widgetPositionMobile: Joi.string().valid('bottom-right', 'bottom-left').required(),
    spacingSide: Joi.number().min(0).max(1000).required(),
    spacingSideMobile: Joi.number().min(0).max(1000).required(),
    spacingBottom: Joi.number().min(0).max(1000).required(),
    spacingBottomMobile: Joi.number().min(0).max(1000).required(),
    zIndex: Joi.number().min(0).max(999999).required(),
    zIndexMobile: Joi.number().min(0).max(999999).required(),
    notificationColor: Joi.string().pattern(_HEX_PATTERN).required(),
};

export function get(){
    return Axios.get('widgets');
}

export function create(data){
    const {error} = Joi.object({name})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.post('widgets', data);
}

export function deleteWidget(data){
    const {error} = Joi.object({_id})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.delete('widgets', {params: data});
}

export function updateSettings(data){
    const {error} = Joi.object({_id, language, notificationSound, isRatingEnabled})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.put('widgets/settings', data);
}

export function updateForms(data){
    const {error} = Joi.object({_id, offlineGreeting, greetingMessage})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.put('widgets/forms', data);
}

export function updateStyles(data){
    const {error} = Joi.object(styles)
        .validate(data.styles, {abortEarly: false});

    return error ? Response({error}) : Axios.put('widgets/styles', data);
}

export function subscribe(data){
    const {error} = Joi.object({_id, email})
        .validate(data, {abortEarly: false});

    return error ? Response({error}) : Axios.get('widgets/subscribe', {params: data});
}