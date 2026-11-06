import {useSelector} from "react-redux";

const ChatBackground = ({collection, _id}) => {
    const {messages: [messages], unread} = useSelector(state => state.chatsMessages.list[collection+_id]);

    const date = messages.length && messages[messages.length-1].dateFull;
    const className = collection === 'internals' ? 'black' :
        unread ? 'yellow' :
        collection !== 'ended' && date + 10000 < Date.now() ? 'silver' : 'default';

    return (
        <div className={'background background-'+className}> </div>
    )
};

export default ChatBackground;