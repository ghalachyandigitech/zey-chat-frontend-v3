import {setPopUp} from "../../../reducers/popUpSlice"
import {deleteChat} from "../../../reducers/user-partner/chatsSlice"
import {deleteChatView} from "../../../reducers/user-partner/chatsViewSavedSlice"
import {deleteChatMessages} from "../../../reducers/user-partner/chatsMessagesSlice"
import {closeIfOpened} from "../../../reducers/user-partner/chatPopupSlice"
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice"
import {useDispatch, useSelector} from "react-redux";
import {end, viewEnd} from "../../../controllers/user-partner/ChatsController";

const ChatEnd = () => {
    const dispatch = useDispatch();
    const {_id, companionId, companionName, collection, userPartnerId} = useSelector(state => state.popUp.payload);
    const name = collection === 'views' ? 'view' : 'chat';

    return (
        <>
            <div>Are you sure you want to end {name} with "{companionName}"?</div>
            <div className="input-group">
                <button className="button" onClick={() => dispatch(setPopUp(0))}>cancel</button>
                <button className="button" onClick={async () => {
                    if(name === 'view'){
                        viewEnd(_id);
                        dispatch(deleteChatView({chatId: _id, userPartnerId}))
                    }else{
                        end(_id, companionId);
                    }

                    dispatch(closeIfOpened({_id, collection}));
                    dispatch(deleteChat({_id, collection}));
                    dispatch(deleteChatMessages({_id, collection}));
                    dispatch(setPopUp(0));
                    dispatch(setFlashPopUp(`${name} ended`));
                }}>end {name}</button>
            </div>
        </>
    )
};

export default ChatEnd;