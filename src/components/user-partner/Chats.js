import {chatPopupOpen} from "../../reducers/user-partner/chatPopupSlice";
import {useSelector, useDispatch} from "react-redux";
import {CloseSvg} from "../../Icons";
import {setPopUp} from "../../reducers/popUpSlice";
import ChatBackground from "./ChatBackground";
import ChatUnread from "./ChatUnread";

const Chats = () => {
    const dispatch = useDispatch();
    const chats = useSelector(state => state.chats.list);

    return (
        <div className="chats">
            {Object.values(chats).map(({collection, _id, status, companionId, companionName, userPartnerId}) =>
                <div className={`item ${collection === 'ended' ? 'item-min' : ''}`} key={_id}
                     onClick={() => dispatch(chatPopupOpen({_id, collection, companionId}))}>
                    <ChatBackground collection={collection} _id={_id}/>
                    <div className="container">
                        <ChatUnread collection={collection} _id={_id} />
                        <span className="name">{companionName}</span>
                        <CloseSvg width={30} fill="white" onButtonClick={e => {
                            e.stopPropagation();
                            dispatch(setPopUp(['chats/end', {_id, companionId, companionName, collection, userPartnerId}]));
                        }} />
                    </div>
                </div>
            )}
        </div>
    )
};

export default Chats;