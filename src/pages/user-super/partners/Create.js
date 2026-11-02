import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Form from "./Form";
import {LoadingGif} from "../../../Icons";
import {create} from "../../../controllers/user-super/PartnersController";
import {setPartner} from "../../../reducers/user-super/partnersSlice";
import {setPopUp} from "../../../reducers/popUpSlice";
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice";

const Create = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});
    const [name, setName] = useState('');
    const [userAdminsIds, setUserAdminsIds] = useState([]);
    const [file, setFile] = useState(0);
    const {userAdmins} = useSelector(state => state.popUp.payload);
    const userAdminsOptions = Object.entries(userAdmins).map(([k, v]) => ({'value': k, 'label': v}));

    return (
        <>
            {error.server && error.server}
            <Form error={error} state={{
                name: [name, setName],
                file: [file, setFile],
                userAdminsIds: [userAdminsIds, setUserAdminsIds],
                userAdminsOptions: userAdminsOptions
            }} />
            {load && <LoadingGif width='24' /> || <button className="button" onClick={async () => {
                setLoad(true);
                setError({});

                const [error, payload] = await create({name, userAdminsIds, file});

                setLoad(false);

                if(Object.keys(error).length) return setError(error);

                dispatch(setPartner(payload));
                dispatch(setFlashPopUp('partner created'));
                dispatch(setPopUp(0));
            }}>create</button>}
        </>
    )
};

export default Create;