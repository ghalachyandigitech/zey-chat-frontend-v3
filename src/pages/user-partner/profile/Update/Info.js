import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../../../../reducers/user-partner/profileSlice";
import {setPopUp} from "../../../../reducers/popUpSlice";
import {update} from "../../../../controllers/profile/Agents";
import {setFlashPopUp} from "../../../../reducers/flashPopUpSlice"
import Input from "../../../../components/Input";

const Info = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState({});
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.userEmail);
    const [tag, setTag] = useState(profile.tag);

    return(
        <>
            {error.server && error.server}
            <div className="input-group">
                <Input name="name" value={name} setValue={setName} error={error.name}/>
                <Input name="email" value={email} setValue={setEmail} error={error.email}/>
            </div>
            <div className="input-group">
                <Input name="tag" value={tag} setValue={setTag} error={error.tag}/>
            </div>
            <button className="button" onClick={async () => {
                setLoad(true);

                const [error, payload] = await update({name, email});

                setLoad(true);

                if(Object.keys(error).length) return setError(error);

                dispatch(updateProfile(payload));
                dispatch(setFlashPopUp(['profile updated']));
                dispatch(setPopUp(['']));
            }}>save</button>
        </>
    )
};

export default Info;