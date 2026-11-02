import {create} from "../../../controllers/user-partner/AgentsController";
import {useState} from "react";
import {addAgents} from "../../../reducers/user-partner/agentsSlice";
import {setPopUp} from "../../../reducers/popUpSlice";
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice";
import {useDispatch} from "react-redux";
import Admins from "./Form/Admins";
import {LoadingGif} from "../../../Icons";

const Create = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(3);
    const [limit, setLimit] = useState(4);

    return (
        <>
            {error.server && error.server}
            <Admins error={error} state={{
                name: [name, setName],
                email: [email, setEmail],
                role: [role, setRole],
                limit: [limit, setLimit]}}
            />
            <div className="input-group">
                {(load && <LoadingGif width="24" />) || <button className="button" onClick={async () => {
                    setLoad(true);
                    setError({});

                    const [error, payload] = await create({name, email, role, limit});

                    setLoad(false);

                    if(Object.keys(error).length) return setError(error);

                    dispatch(addAgents(payload));
                    dispatch(setPopUp([0]));
                    dispatch(setFlashPopUp('agents created'));
                }}>create</button>}
            </div>
        </>
    )
};

export default Create;