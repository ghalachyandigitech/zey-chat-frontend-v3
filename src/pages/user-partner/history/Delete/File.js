import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoadingGif} from "../../../../Icons";
import {deleteMessageFileById} from "../../../../controllers/user-partner/MessagesController";
import {deleteMessageFile} from "../../../../reducers/user-partner/transcriptSlice"
import {setPopUp} from "../../../../reducers/popUpSlice"
import {setFlashPopUp} from "../../../../reducers/flashPopUpSlice"

const File = () => {
    const dispatch = useDispatch();
    const {messageId} = useSelector(state => state.popUp.payload);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);

    return (
        <>
            {error.server}
            <div>are you sure you want to delete file?</div>
            {load && <LoadingGif width='24' /> || <div className="input-group">
                <button className="button" onClick={() => dispatch(setPopUp(0))}>cancel</button>
                <button className="button" onClick={async () => {
                    setLoad(true);

                    const [error] = await deleteMessageFileById(messageId);

                    setLoad(false);

                    if(Object.keys(error).length) return setError(error);

                    dispatch(deleteMessageFile(messageId));
                    dispatch(setPopUp([0]));
                    dispatch(setFlashPopUp('file deleted'));
                }}>delete</button>
            </div>}
        </>
    )
};

export default File;