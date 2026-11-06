import {ArrowSvg} from "../../../../Icons";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {view} from "../../../../controllers/user-partner/ChatsController";
import {awaitChat} from "../../../../reducers/user-partner/chatPopupSlice";
import {setView} from "../../../../reducers/user-partner/chatsViewSavedSlice";

//todo backendum visitori mej created key ka bayc vonc vor chi ogtagorcvum
const VisitorsType = ({type, name, online, viewChat, filter}) => {
    const dispatch = useDispatch();
    const [table, setTable] = useState(false);

    const agentColumn = ['served', 'assigned'].includes(type);
    const agents = useSelector(state => state.agents.list);
    let visitors = useSelector(state => state.visitors[type]);
    if(filter) visitors = visitors.filter(visitor => visitor.name.indexOf(filter) !== -1);

    return(
        <div className="visitors-view-type">
            <div className="header" onClick={() => setTable(!table)}>
                <span className="name">{name}</span>
                <span className="count">{visitors.length}</span>
                <ArrowSvg rotateUp={table} />
            </div>
            {table && <div className="table">
                <table>
                    <thead><tr>
                        <th>visitor</th>
                        <th>info</th>
                        {agentColumn ? <th>agent</th> : ''}
                        <th>referrer</th>
                        <th>chats</th>
                        {online && <th>online</th>}
                    </tr></thead>
                    <tbody>
                        {visitors.map(visitor =>
                            <tr onClick={() => {
                                if(viewChat){
                                    dispatch(awaitChat({_id: visitor.chatId}));
                                    dispatch(setView({
                                        _id: visitor.chatId,
                                        userPartnerId: visitor.companionId,
                                        userPartnerName: agents[visitor.companionId].name,
                                        companionName: visitor.name
                                    }));
                                    view(visitor.chatId);
                                }
                            }}>
                                <td>{visitor.name}</td>
                                <td className="user-agent">
                                    <span className={"flags_small flags_small-" + visitor.countryCode}> </span>
                                    <img src={`/images/browsers/${visitor.browser}.png`} />
                                    <img src={`/images/platforms/${visitor.platform}.png`} />
                                </td>
                                {agentColumn ? <td>{agents[visitor.companionId].name}</td> : ''}
                                <td>{visitor.referrer}</td>
                                <td>{visitor.pastChats}</td>
                                {online && <td>{!visitor.roleCreated ? 0 : Math.round((Date.now() - new Date(visitor.roleCreated).getTime())/1000/60)} min.</td>}
                            </tr>
                        )}
                    </tbody>
                </table>
                {!visitors.length && <div>result not found</div>}
            </div>}
        </div>
    )
};

export default VisitorsType;