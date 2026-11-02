import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteWidget} from "../../../controllers/user-partner/WidgetsController";
import {deleteById} from "../../../reducers/user-partner/widgetsSlice"
import {setPopUp} from "../../../reducers/popUpSlice"
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice"
import {LoadingGif} from "../../../Icons";

const Delete = () => {
    const dispatch = useDispatch();
    const {_id, name} = useSelector(state => state.popUp.payload);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});

    return (
        <>
            {error.server}
            <div>Are you sure you want to delete widget "{name}"?</div>
            {(load && <LoadingGif width='24' />) || <div className="input-group">
                <button className="button" onClick={() => dispatch(setPopUp(0))}>cancel</button>
                <button className="button" onClick={async () => {
                    setLoad(true);

                    const [error] = await deleteWidget({_id: _id});

                    setLoad(false);

                    if(Object.keys(error).length) return setError(error);

                    dispatch(deleteById(_id));
                    dispatch(setPopUp([0]));
                    dispatch(setFlashPopUp('widget deleted'));
                }}>delete</button>
            </div>}
        </>
    )
};

export default Delete;