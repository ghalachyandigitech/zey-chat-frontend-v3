import {useState} from "react";
import {ArrowSvg, TeamSvg} from "../../Icons";
import {setPopUp} from "../../reducers/popUpSlice";
import {awaitChat, chatPopupOpen} from "../../reducers/user-partner/chatPopupSlice";
import {setInternalChat} from "../../controllers/user-partner/ChatsController";
import {useDispatch, useSelector} from "react-redux";
import {USER_PARTNERS_STATUSES} from "../../Constants";

const TeamMenu = () => {
    const dispatch = useDispatch();
    const [opened, setOpened] = useState(0);
    const list = useSelector(state => state.agents.list);
    const agents = Object.entries(list);
    const chats = useSelector(state => state.chats.list);
    const itemHeight = 35;
    const height = opened ? itemHeight + agents.length*itemHeight : 0;

    return(
        <>
            <div className="item" onClick={() => setOpened(1-opened)}>
                <TeamSvg />team<ArrowSvg rotateUp={opened} />
            </div>
            <div className='team' style={{
                maxHeight: `${height}px`,
                transition: `max-height ${0.15 * height/itemHeight}s ease-out`
            }}>
                <div className="member" onClick={() => dispatch(setPopUp(['team']))}>view all</div>
                {agents.map(([userPartnerId, {status, name}]) =>
                    <div className="member" key={Math.random()} onClick={() => {
                        const chat = Object.values(chats).find(i => i.companionId === userPartnerId);
                        if(chat){
                             dispatch(chatPopupOpen(chat))
                        }else{
                             dispatch(awaitChat({companionId: userPartnerId}));
                             setInternalChat(userPartnerId);
                        }
                    }}><span className={"status status-" + USER_PARTNERS_STATUSES[status]}> </span>{name}</div>
                )}
            </div>
        </>
    )
};

export default TeamMenu;