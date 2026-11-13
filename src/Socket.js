import {io} from 'socket.io-client';
import {USER_PARTNERS_ROLES, BASE_URL} from "./Constants";

export let socket = null;

export function connectSocket({partnerId, userPartnerId, role}){
    socket = io(`${BASE_URL}${partnerId}`, {
        auth: {
            role: USER_PARTNERS_ROLES[role],
            userId: userPartnerId
        }
    });
}