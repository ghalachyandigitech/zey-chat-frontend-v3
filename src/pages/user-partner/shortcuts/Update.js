import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoadingGif} from "../../../Icons";
import Input from "../../../components/Input";
import {update} from "../../../controllers/user-partner/ShortcutsController";
import {updateShortcutById} from "../../../reducers/user-partner/shortcutSlice";
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice";
import {setPopUp} from "../../../reducers/popUpSlice";
import Textarea from "../../../components/Textarea";
import Form from "./Form";

const Update = () => {
    const dispatch = useDispatch();
    const popUpPayload = useSelector(state => state.popUp.payload);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});
    const [tag, setTag] = useState(popUpPayload.tag);
    const [message, setMessage] = useState(popUpPayload.message);

    return (
        <>
            {error.server}
            <Form error={error} state={{
                tag: [tag, setTag],
                message: [message, setMessage],
            }}/>
            {load && <LoadingGif width='24' /> || <button className="button" onClick={async () => {
                setLoad(true);
                setError({});

                const [error, payload] = await update({_id: popUpPayload._id, tag, message});

                setLoad(false);

                if(Object.keys(error).length) return setError(error);

                dispatch(updateShortcutById(payload));
                dispatch(setPopUp([0]));
                dispatch(setFlashPopUp('shortcuts updated'));
            }}>update</button>}
        </>
    )
};

export default Update;