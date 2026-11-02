import {useSelector, useDispatch} from 'react-redux';
import Header from "./Header";
import VisitorChat from "./VisitorChat";
import InternalChat from "./InternalChat";
import {chatPopupClose} from "../../../reducers/user-partner/chatPopupSlice";
import {LoadingGif} from "../../../Icons";

const ChatPopUp = () => {
    const dispatch = useDispatch();
    const {_id, collection, companionId} = useSelector(state => state.chatPopup);

    console.log('ChatPopUp component');
    if(collection) return (
        <div className="pop-up" onClick={e => e.target.classList.contains('pop-up') ? dispatch(chatPopupClose()): ''}>
            <div className="chat-container">
                {(collection === 'waiting' && <LoadingGif />)
                || (collection === 'internals' && <>
                    <Header _id={_id} collection={collection} />
                    <InternalChat _id={_id} />
                </>)
                || (collection === 'views' && <>
                    <Header _id={_id} collection={collection} />
                    <VisitorChat _id={_id} collection={collection} companionId={companionId}/>
                </>)
                || (['served', 'ended'].includes(collection) && <>
                    <Header _id={_id} collection={collection} />
                    <VisitorChat _id={_id} messaging={!['ended'].includes(collection)} collection={collection} companionId={companionId}/>
                </>)}
            </div>
        </div>
    )
};

export default ChatPopUp;