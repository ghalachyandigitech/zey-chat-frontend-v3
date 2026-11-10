import {Axios} from "../../Axios";
import {socket} from "../../Socket";
import {getPlatform, getBrowser} from "../../helpers/stringHelper";

export function setBan(userPartnerId, time, reason){//todo backendi vra validacnel, stex el inch vor tex
    socket.emit('permission.ban', [userPartnerId, time, reason]);
}

export function updateStatus(status){
    //todo id validation ete petq a
    //todo status validation ete petq a
    //todo ete nuyn statusn a chuxarkel
    socket.emit('agents.update.status', status);
}

export async function auth(urlSegment){
    const accessToken = localStorage.getItem(urlSegment);
    if(!accessToken) return false;

    const [error, payload] = await Axios.get('user-partners/sign-in', {headers: {"Authorization": `Bearer ${accessToken}`}});

    if(Object.keys(error).length) return false;

    Axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

    return payload;
}

export function logOut(urlSegment){
    localStorage.removeItem(urlSegment);

    socket.auth = {};
    socket.emit('logout');
    socket.disconnect();

    Axios.defaults.headers['Authorization'] = ``;
}

export function updateNote(note, userPartnerId){
    return Axios.put('user-partners/note', {note}, {params: {userPartnerId: userPartnerId}});
}

export async function getVisitor(userPartnerId){
    const [error, payload] = await Axios.get('user-partners/visitors', {params: {userPartnerId: userPartnerId}});

    if(!Object.keys(error).length){
        const {userPartner} = payload;
        userPartner.platform = getPlatform(userPartner.userAgent);
        userPartner.browser = getBrowser(userPartner.userAgent);

        return [{}, payload];
    }

    return [error];
}