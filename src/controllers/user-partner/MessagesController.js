import {socket} from '../../Socket'
import {FILE_PATTERN} from '../../Constants'
import {Axios} from "../../Axios";

export function deleteMessageFileById(messageId){
    return Axios.delete('chats/file', {params: {messageId}});
}

export function set(_id, message){
    if(!message.message && !message.file[0]) return [{message: ''}];
    if(message.file[0] && !FILE_PATTERN.includes(message.file[0])) return [{file: ''}];

    socket.emit('message.set', [_id, [message.hashId, [message.message, message.file]]]);

    return [{}];
}

export function page(_id, firstMessageId) {
    socket.emit('message.page', [_id, 'i' + firstMessageId]);
}

export function read(_id){
    socket.emit('message.read', _id);
}

export function setTyping(_id, typing){
    socket.emit('message.typing', [typing, _id]);
}