import {DoubleTickSvg, TickSvg} from "../../../Icons";
import {useSelector} from "react-redux";

const MessageStatus = ({_id, messageId}) => {
    const companionUnread = useSelector(state => state.chatsUnread.chats[_id]);

    return messageId in companionUnread && [<TickSvg />, <DoubleTickSvg />][companionUnread[messageId]]
                || <DoubleTickSvg fill="blue" />
};

export default MessageStatus;