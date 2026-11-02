import {useState} from "react";
import {useDispatch} from "react-redux";
import {createUserAdmin} from "../../../controllers/user-super/UserAdminsController";
import {setUserAdmin} from "../../../reducers/user-super/userAdminsSlice";
import {setPopUp} from "../../../reducers/popUpSlice";
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice";
import Form from "./Form";
import {LoadingGif} from "../../../Icons";

const Create = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

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

                const [error, {userAdmin}] = await createUserAdmin({name, companyName, phone, email});

                setLoad(false);

                if(Object.keys(error).length) return setError(error);

                dispatch(setUserAdmin(userAdmin));
                dispatch(setFlashPopUp('admin created'));
                dispatch(setPopUp(0));
            }}>create</button>}
        </>
    )
};

export default Create;