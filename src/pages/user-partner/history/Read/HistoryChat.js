import {useState} from "react";
import VisitorInfo from "../../../../components/user-partner/VisitorInfo";
import Transcript from "../../../../components/user-partner/Transcript";
import Tabs from "../../../../components/Tabs";
import ChatLogs from "./ChatLogs";
import BanButton from "../../../../components/user-partner/BanButton";

const HistoryChat = ({chat}) => {
    const [page, setPage] = useState(0);

    return(
        <>
            <Tabs page={page} setPage={setPage} tabs={[
                [0, 'transcript'],
                [1, 'visitor info'],
                [2, 'chat logs']
            ]} />
            <div className="history-chat-body">
                {[
                    <Transcript companionId={chat.visitor.userPartner._id}/>,
                    <VisitorInfo buttons={<BanButton companionId={chat.visitor.userPartner._id}/>}
                        userPartner={chat.visitor.userPartner} chatsPastLength={chat.visitor.chatsPast.length}/>,
                    <ChatLogs logUsers={chat.transcript.logUsers} logs={chat.transcript.logs} />
                ][page]}
            </div>
        </>
    )
};

export default HistoryChat;