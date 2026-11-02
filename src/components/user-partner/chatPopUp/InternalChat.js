import Messages from './Messages';
import Messaging from './Messaging';

const InternalChat = ({_id}) => {
    return (
        <>
            <div className="body">
                <div className="chat">
                    <Messages _id={_id} collection="internals" messagesStatus={false} />
                    <Messaging _id={_id} collection="internals" />
                </div>
            </div>
        </>
    )
};

export default InternalChat;