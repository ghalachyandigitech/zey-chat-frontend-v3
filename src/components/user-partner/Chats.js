import {chatPopupOpen} from "../../reducers/user-partner/chatPopupSlice";
import {useSelector, useDispatch} from "react-redux";
import {CloseSvg} from "../../Icons";
import {setPopUp} from "../../reducers/popUpSlice";
import ChatBackground from "./ChatBackground";
import ChatUnread from "./ChatUnread";
import {useEffect, useState} from "react";

const Chats = () => {
    const dispatch = useDispatch();
    const chats = useSelector(state => state.chats.list);
    const [iterator, setIterator] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => setIterator(Math.random() + iterator), 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="chats">
            {Object.values(chats).map(({collection, _id, companionId, companionName, userPartnerId}) =>
                <div className={`item ${collection === 'ended' ? 'item-min' : ''}`} key={_id + collection}
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