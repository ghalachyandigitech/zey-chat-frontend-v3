import {ValidationError} from "joi";
import {AxiosError} from "axios";

export function Response({error, payload}){
    if(error){
        if(error instanceof ValidationError)
            error = error.details.reduce((e, i) => {e[i.context.key] = i.message; return e}, {});
        if(error instanceof AxiosError)
            error = {server: error.response?.data?.error || error.message};

        return [error, {}]
    }

    return [{}, payload];
}
