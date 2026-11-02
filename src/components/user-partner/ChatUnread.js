import {useSelector, useDispatch} from "react-redux";
import {setUnread} from "../../reducers/user-partner/chatsMessagesSlice";
import {read} from "../../controllers/user-partner/MessagesController";

const ChatUnread = ({collection, _id}) => {
    const dispatch = useDispatch();
    const {unread} = useSelector(state => state.chatsMessages.list[collection+_id]);
    const chatPopUpId = useSelector(state => state.chatPopup._id);

    if(chatPopUpId === _id && unread > 0){
        read(_id);
        dispatch(setUnread([_id, 0]));
    }

    return (
        <>
            {unread > 0 && <span className="unread">{unread}</span>}
        </>
    )
};

export default ChatUnread;