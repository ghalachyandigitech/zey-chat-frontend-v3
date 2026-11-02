import {create} from "../../../controllers/user-partner/WidgetsController";
import {useState} from "react";
import {setPopUp} from "../../../reducers/popUpSlice"
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice"
import {setWidget} from "../../../reducers/user-partner/widgetsSlice"
import {useDispatch} from "react-redux";
import Input from "../../../components/Input";
import {LoadingGif} from "../../../Icons";

const Create = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});
    const [name, setName] = useState('');

    return (
        <>
            {error.server}
            <Input name="name" value={name} setValue={setName} error={error.name} className="div"/>
            {(load && <LoadingGif width='24' />) || <div className="input-group">
                <button className="button" onClick={async () => {
                    setLoad(true);

                    setError({});

                    const [error, payload] = await create({name});

                    setLoad(false);

                    if(Object.keys(error).length) return setError(error);

                    dispatch(setWidget(payload));
                    dispatch(setPopUp([0]));
                    dispatch(setFlashPopUp('widget created'));
                }}>create</button>
            </div>}
        </>
    )
};

export default Create;