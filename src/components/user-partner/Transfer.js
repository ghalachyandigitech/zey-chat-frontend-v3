import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPopUp} from "../../reducers/popUpSlice";
import {deleteTransfer} from "../../reducers/user-partner/profileSlice";
import {offerTransfer, cancelTransfer, setTransfer, offerTransferValidation} from "../../controllers/user-partner/ChatsController";
import Select from "../Select";

const Transfer = () => {
    const dispatch = useDispatch();
    const {_id} = useSelector(state => state.popUp.payload);
    const {transfers} = useSelector(state => state.profile);
    const agents = useSelector(state => state.agents.list);
    const {userPartnerId: authUserPartnerId} = useSelector(state => state.userPartner);
    const transferRequest = transfers[_id];
    const [error, setError] = useState({});
    const [selectedUserPartnerId, setSelectedUserPartnerId] = useState('');

    return (
        <>
            {transferRequest && <>
                <div><strong>agent: </strong>{transferRequest.agentName}</div>
                <div><strong>visitor ID: </strong>{transferRequest.visitorName}</div>
            </>}
            <div className="input-group">
                <Select error={error.userPartnerId} name="agent" onChange={v => setSelectedUserPartnerId(v)} options={
                    [['', '--select--']].concat(Object.entries(agents).map(([userPartnerId, {name}]) =>
                        [userPartnerId, authUserPartnerId === userPartnerId ? 'you' : name])
                    )
                }/>
                <button className="button" onClick={async () => {
                    const [error] = offerTransferValidation({userPartnerId: selectedUserPartnerId});

                    if(Object.keys(error).length) return setError(error);

                    if(!transferRequest) setTransfer(_id, true);
                    offerTransfer(_id, selectedUserPartnerId);

                    dispatch(deleteTransfer(_id));
                    dispatch(setPopUp(0));
                }}>transfer</button>
                {transferRequest && <button className="button" onClick={async () => {
                    cancelTransfer(_id);

                    dispatch(deleteTransfer(_id));
                    dispatch(setPopUp(0));
                }}>cancel</button>}
            </div>
        </>
    )
};

export default Transfer;