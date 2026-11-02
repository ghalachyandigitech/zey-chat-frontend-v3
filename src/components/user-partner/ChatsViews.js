import {useState} from "react";
import {awaitChat} from "../../reducers/user-partner/chatPopupSlice";
import {useSelector, useDispatch} from "react-redux";
import {ArrowSvg, CloseSvg, ViewEyeSvg} from "../../Icons";
import {setPopUp} from "../../reducers/popUpSlice";
import {view} from "../../controllers/user-partner/ChatsController";

const ChatsViews = () => {
    const dispatch = useDispatch();
    const userPartnersChats = useSelector(state => state.chatsViewSaved.userPartners);
    const [userPartners, setUserPartners] = useState({});
    const [cover, setCover] = useState(false);
    const userPartnerChatsEntries = Object.entries(userPartnersChats);

    return (
        <div className="chats-views">
            {cover && userPartnerChatsEntries.length && <div className="cover" onClick={() => setCover(false)}> </div>}
            <div className="container">
                <ViewEyeSvg onButtonClick={() => userPartnerChatsEntries.length && setCover(!cover)} />
                {cover && <div className="body">
                    {userPartnerChatsEntries.map(([userPartnerId, {name, chats}]) =>
                        <>
                            <span onClick={() => setUserPartners({...userPartners, [userPartnerId]: !userPartners[userPartnerId]})}>
                                {name} <ArrowSvg rotateUp={userPartners[userPartnerId]}/>
                            </span>
                            {userPartners[userPartnerId] && Object.values(chats).map(chat =>
                                <div>
                                    <span onClick={() => {
                                        setCover(false);
                                        dispatch(awaitChat({_id: chat._id, collection: 'waiting'}));
                                        view(chat._id);
                                    }}>{chat.companionName}</span>
                                    <CloseSvg width="24" onButtonClick={() => {
                                        dispatch(setPopUp(['chats/end', {...chat, collection: 'views'}]));
                                    }} />
                                </div>
                            )}
                        </>
                    )}
                </div>}
            </div>
            {userPartnerChatsEntries.length < 1 && cover && setCover(false)}
        </div>
    )
};

export default ChatsViews;