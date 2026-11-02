import {Axios} from '../../Axios';
import {Response} from '../../Controller';
import {socket} from "../../Socket";
import Joi from 'joi';
import {_ID_PATTERN} from "../../Constants";

const userPartnerId = Joi.string().regex(_ID_PATTERN).required().label('agent');

export function setTransfer(_id, rapid){
    socket.emit('chats.transfer.set', [_id, rapid]);
}

export function offerTransferValidation(data){
    const {error} = Joi.object({userPartnerId})
        .validate(data, {abortEarly: false});

    return Response({error});
}

export function cancelTransfer(_id){
    socket.emit('chats.transfer.offer', [_id, '']);
}

export function offerTransfer(_id, userPartnerId){
    socket.emit('chats.transfer.offer', [_id, userPartnerId]);
}

export function view(_id){
    socket.emit('chats.view', _id);
}

export function viewEnd(_id){
    socket.emit('chats.view.end', _id);
}

export function endView(_id){
    socket.emit('chats.view.end', _id);
}

export function get(_id){
    socket.emit('chats.get', _id);
}

export function end(_id, companionId){
    socket.emit('chats.end', [_id, companionId]);
}

export function setInternalChat(userPartnerId){
    socket.emit('chats.internal.set', userPartnerId);
}

export function getTranscript(_id){
    return Axios.get('chats/transcript', {params: {_id: _id}});
}

export function setFile(_id){
    socket.emit('permission.file', _id);
}