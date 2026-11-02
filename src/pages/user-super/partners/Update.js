import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {update} from "../../../controllers/user-super/PartnersController";
import {updatePartner} from "../../../reducers/user-super/partnersSlice";
import {setPopUp} from "../../../reducers/popUpSlice";
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice";
import Form from "./Form";
import {LoadingGif} from "../../../Icons";

const Update = () => {
    const dispatch = useDispatch();
    const {partner, userAdmins} = useSelector(state => state.popUp.payload);
    const [userAdminsIds, setUserAdminsIds] = useState(partner.userAdminsIds);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});
    const [name, setName] = useState(partner.name);
    const [file, setFile] = useState(partner.file);

    const userAdminsOptions = [];
    const userAdminsDefaultValues = []; //todo amen angam anum a
    for(const [k, v] of Object.entries(userAdmins)){
        const option = {'value': k, 'label': v};

        userAdminsOptions.push(option);
        if(userAdminsIds.includes(k)) userAdminsDefaultValues.push(option)
    }

    return (
        <>
            {error.server && error.server}
            <Form error={error} state={{
                name: [name, setName],
                file: [file, setFile],
                userAdminsIds: [userAdminsIds, setUserAdminsIds],
                userAdminsOptions: userAdminsOptions,
                userAdminsDefaultValues: userAdminsDefaultValues
            }} />
            {load && <LoadingGif width='24' /> || <button className="button" onClick={async () => {
                setLoad(true);
                setError({});

                const [error, payload] = await update({_id: partner._id, name, userAdminsIds, file});

                setLoad(false);

                if(Object.keys(error).length) return setError(error);

                dispatch(updatePartner(payload));
                dispatch(setFlashPopUp('partner updated'));
                dispatch(setPopUp(0));
            }}>update</button>}
        </>
    )
};

export default Update;