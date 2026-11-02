import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoadingGif} from "../../../Icons";
import {deleteById} from "../../../controllers/user-partner/ShortcutsController";
import {deleteShortcuts} from "../../../reducers/user-partner/shortcutSlice"
import {setPopUp} from "../../../reducers/popUpSlice"
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice"

const Delete = () => {
    const dispatch = useDispatch();
    const {_id, tag} = useSelector(state => state.popUp.payload);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);

    return (
        <>
            {error.server}
            <div>are you sure you want to delete shortcut "{tag}"?</div>
            {load && <LoadingGif width='24' /> || <div className="input-group">
                <button className="button" onClick={() => dispatch(setPopUp(0))}>cancel</button>
                <button className="button" onClick={async () => {
                    setLoad(true);

                    const [error] = await deleteById({_id: _id});

                    setLoad(false);

                    if(Object.keys(error).length) return setError(error);

                    dispatch(deleteShortcuts(_id));
                    dispatch(setPopUp([0]));
                    dispatch(setFlashPopUp('shortcut deleted'));
                }}>delete</button>
            </div>}
        </>
    )
};

export default Delete;