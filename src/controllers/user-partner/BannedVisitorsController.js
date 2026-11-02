import {Axios} from '../../Axios'

export async function get(data){
    return await Axios.get('userPartner/banned-visitors', data);
}