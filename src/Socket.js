import {io} from 'socket.io-client';
import {USER_PARTNERS_ROLES} from "./Constants";

export let socket = null;
export let config = null;

export function connectSocket({partnerId, userPartnerId, role}){
    socket = io(`http://localhost:5006/${partnerId}`, {
        auth: {
            role: USER_PARTNERS_ROLES[role],
            userId: userPartnerId
        }
    });

    config = {partnerId, userPartnerId, role};
    return socket;
}

export function getSocket(){
    return socket;
}