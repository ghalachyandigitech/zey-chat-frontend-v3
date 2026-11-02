import {deleteById} from "../../../controllers/user-partner/AgentsController";
import {useState} from "react";
import {deleteAgent} from "../../../reducers/user-partner/agentsSlice"
import {setPopUp} from "../../../reducers/popUpSlice"
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice"
import {useDispatch, useSelector} from "react-redux";
import {LoadingGif} from "../../../Icons";

const Delete = () => {
    const dispatch = useDispatch();
    const {userPartnerId, name} = useSelector(state => state.popUp.payload);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});

    return (
        <>
            {error.server}
            <div>Are you sure you want to delete agent "{name}"?</div>
            {(load && <LoadingGif width='24' />) || <div className="input-group">
                <button className="button" onClick={() => dispatch(setPopUp(0))}>cancel</button>
                <button className="button" onClick={async () => {
                    setLoad(true);

                    const [error] = await deleteById({userPartnerId: userPartnerId}); //todo

                    setLoad(false);

                    if(Object.keys(error).length) return setError(error);

                    dispatch(deleteAgent(userPartnerId));
                    dispatch(setPopUp([0]));
                    dispatch(setFlashPopUp('agents deleted'));
                }}>delete</button>
            </div>}
        </>
    )
};

export default Delete;