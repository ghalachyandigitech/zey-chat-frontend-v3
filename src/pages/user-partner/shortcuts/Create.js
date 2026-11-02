import {useState} from "react";
import {useDispatch} from "react-redux";
import {create} from "../../../controllers/user-partner/ShortcutsController";
import {addShortcuts} from "../../../reducers/user-partner/shortcutSlice"
import {setPopUp} from "../../../reducers/popUpSlice"
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice"
import {LoadingGif} from "../../../Icons";
import Form from "./Form";

const Create = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});
    const [tag, setTag] = useState('');
    const [message, setMessage] = useState('');

    return (
        <>
            {error.server}
            <Form error={error} state={{
                tag: [tag, setTag],
                message: [message, setMessage],
            }}/>
            {(load && <LoadingGif width='24' />) || <button className="button" onClick={async () => {
                setLoad(true);
                setError({});

                const [error, payload] = await create({tag, message});

                setLoad(false);

                if(Object.keys(error).length) return setError(error);

                dispatch(addShortcuts(payload));
                dispatch(setPopUp([0]));
                dispatch(setFlashPopUp('shortcut created'));
            }}>create</button>}
        </>
    )
};

export default Create;