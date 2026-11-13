import {useSelector} from "react-redux";
import {CHAT_TO_INVISIBLE_TIMEOUT} from "../../Constants";

const ChatBackground = ({collection, _id}) => {
    const {messages: [messages], unread} = useSelector(state => state.chatsMessages.list[collection+_id]);

    const date = messages.length && messages[messages.length-1].dateFull;
    const className = collection === 'internals' ? 'black' : unread ? 'yellow' :
        collection !== 'ended' && date + CHAT_TO_INVISIBLE_TIMEOUT < Date.now() ? 'silver' : 'default';

    return (
        <div className={'background background-'+className}> </div>
    )
};

export default ChatBackground;