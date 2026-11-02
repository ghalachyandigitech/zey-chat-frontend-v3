import {Axios} from '../../Axios'

export async function getPage(data){
    return await Axios.post('user-partners/chats', data);
}