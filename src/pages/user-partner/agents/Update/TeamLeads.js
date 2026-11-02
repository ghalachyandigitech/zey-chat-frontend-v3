import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoadingGif} from "../../../../Icons";
import {teamLeadsUpdate} from "../../../../controllers/user-partner/AgentsController";
import {updateAgentById} from "../../../../reducers/user-partner/agentsSlice";
import {setFlashPopUp} from "../../../../reducers/flashPopUpSlice";
import {setPopUp} from "../../../../reducers/popUpSlice";
import Form from "../Form/TeamLeads";

const TeamLeads = () => {
    const dispatch = useDispatch();
    const popUpPayload = useSelector(state => state.popUp.payload);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});
    const [name, setName] = useState(popUpPayload.name);
    const [limit, setLimit] = useState(popUpPayload.limit);

    return (
        <>
            {error.server && error.server}
            <Form error={error} state={{
                name: [name, setName],
                limit: [limit, setLimit]}}
            />
            {(load && <LoadingGif width="24" />) || <button className="button" onClick={async () => {
                setLoad(true);
                setError({});

                const [error, payload] = await teamLeadsUpdate({
                    userPartnerId: popUpPayload.userPartnerId,
                    name, limit
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

export default TeamLeads;