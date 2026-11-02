import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUserAdmin} from "../../../controllers/user-super/UserAdminsController";
import {updateUserAdminById} from "../../../reducers/user-super/userAdminsSlice";
import {setPopUp} from "../../../reducers/popUpSlice";
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice";
import Form from "./Form";
import {LoadingGif} from "../../../Icons";

const Update = () => {
    const dispatch = useDispatch();
    const popUpPayload = useSelector(state => state.popUp.payload);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});
    const [name, setName] = useState(popUpPayload.name);
    const [companyName, setCompanyName] = useState(popUpPayload.companyName);
    const [phone, setPhone] = useState(popUpPayload.phone);
    const [email, setEmail] = useState(popUpPayload.email);

    return (
        <>
            {error.server && error.server}
            <Form error={error} state={{
                name: [name, setName],
                companyName: [companyName, setCompanyName],
                phone: [phone, setPhone],
                email: [email, setEmail]
            }}/>
            {load && <LoadingGif width='24' /> || <button className="button" onClick={async () => {
                setLoad(true);
                setError({});

                const [error, {userAdmin}] = await updateUserAdmin({_id: popUpPayload._id, name, companyName, phone, email});

                setLoad(false);

                if(Object.keys(error).length) return setError(error);

                dispatch(updateUserAdminById(userAdmin));
                dispatch(setFlashPopUp('admin updated'));
                dispatch(setPopUp(0));
            }}>update</button>}
        </>
    )
};

export default Update;