import {useDispatch, useSelector} from "react-redux";
import {SetInternalChatSvg} from "../../Icons";
import {setInternalChat} from "../../controllers/user-partner/ChatsController";
import {USER_PARTNERS_STATUSES, USER_PARTNERS_ROLES} from "../../Constants";
import {setPopUp} from "../../reducers/popUpSlice";
import {awaitChat, chatPopupOpen} from "../../reducers/user-partner/chatPopupSlice";

const Team = () => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.agents.list);
    const {teamChats, chatWith} = useSelector(state => state.userPartner.config);
    const agents = Object.entries(list);
    const chats = useSelector(state => state.visitors.list);
    const served = useSelector(state => state.visitors.served);

    return (
        <div className="table">
            <table>
                <thead><tr>
                    <th>name</th>
                    <th>role</th>
                    <th>statue</th>
                    {teamChats && <th>chats count</th>}
                    <th>chat</th>
                </tr></thead>
                <tbody>
                {agents.map(([userPartnerId, {role, name, status, limit}]) =>
                    <tr>
                        <td>{name}</td>
                        <td>{USER_PARTNERS_ROLES[role]}</td>
                        <td>{USER_PARTNERS_STATUSES[status]}</td>
                        {teamChats && <td>{limit}/{served.filter(i => i.companionId === userPartnerId).length}</td>}
                        {(!chatWith.includes(USER_PARTNERS_ROLES[role]) && <td> </td>) || <td onClick={() => {
                            const chat = Object.values(chats).find(i => i.companionId === userPartnerId);
                            if(chat){
                                dispatch(chatPopupOpen(chat))
                            }else{
                                dispatch(awaitChat({companionId: userPartnerId}));
                                setInternalChat(userPartnerId);
                            }
                            dispatch(setPopUp(0));
                        }}><div className="actions"><SetInternalChatSvg /></div></td>}
                    </tr>
                )}
                </tbody>
            </table>
            {!agents.length && <div>result not found</div>}
        </div>
    )
};

export default Team;