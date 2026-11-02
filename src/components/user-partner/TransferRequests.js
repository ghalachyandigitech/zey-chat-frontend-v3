import {setPopUp} from "../../reducers/popUpSlice";
import {useSelector, useDispatch} from "react-redux";
import {TransferSvg} from "../../Icons";

const TransferRequests = () => {
    const dispatch = useDispatch();
    const transfers = useSelector(state => state.profile.transfers);
    const chatIds = Object.keys(transfers);

    return (
        <div onClick={() => dispatch(setPopUp(['transfer', {_id: chatIds[0]}]))} className="requests-button">
            <TransferSvg /> transfer requests
            {chatIds.length ? <span className="count">{chatIds.length}</span>: ''}
        </div>
    )
};

export default TransferRequests;