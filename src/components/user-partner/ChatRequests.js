import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {ChatRequestSvg} from "../../Icons";
import {deleteRequest} from "../../reducers/user-partner/profileSlice";
import {awaitChat} from "../../reducers/user-partner/chatPopupSlice";
import {get} from "../../controllers/user-partner/ChatsController";

const ChatRequests = ({chatRequestsRef}) => {
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();
    const list = useSelector(state => state.profile.requests);
    const requests = Object.keys(list);

    return (
        <div ref={chatRequestsRef} className="requests-button" onClick={() => {
            if(load || !requests.length) return;

            setLoad(true);

            get(requests[0]);

            dispatch(deleteRequest(requests[0]));
            dispatch(awaitChat({_id: requests[0], collection: 'waiting'}));

            setLoad(false);
        }}>
            <ChatRequestSvg /> chat requests
            {requests.length ? <span className="count">{requests.length}</span> : ''}
        </div>
    )
};

export default ChatRequests;