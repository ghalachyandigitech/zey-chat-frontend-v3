import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoadingGif} from "../../../../Icons";
import {adminsUpdate} from "../../../../controllers/user-partner/AgentsController";
import {updateAgentById} from "../../../../reducers/user-partner/agentsSlice";
import {setFlashPopUp} from "../../../../reducers/flashPopUpSlice";
import {setPopUp} from "../../../../reducers/popUpSlice";
import Form from "../Form/Admins";

const Admins = () => {
    const dispatch = useDispatch();
    const popUpPayload = useSelector(state => state.popUp.payload);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});
    const [name, setName] = useState(popUpPayload.name);
    const [limit, setLimit] = useState(popUpPayload.limit);
    const [email, setEmail] = useState(popUpPayload.email);
    const [role, setRole] = useState(popUpPayload.role);

    return (
        <>
            {error.server && error.server}
            <Form error={error} state={{
                name: [name, setName],
                email: [email, setEmail],
                role: [role, setRole],
                limit: [limit, setLimit]}}
            />
            {(load && <LoadingGif width="24" />) || <button className="button" onClick={async () => {
                setLoad(true);
                setError({});

                const [error, payload] = await adminsUpdate({
                    userPartnerId: popUpPayload.userPartnerId,
                    name, limit, email, role,
                });

                setLoad(false);

                if(Object.keys(error).length) return setError(error);

                dispatch(updateAgentById(payload));
                dispatch(setPopUp([0]));
                dispatch(setFlashPopUp('agents updated'));
            }}>update</button>}
        </>
    )
};

export default Admins;