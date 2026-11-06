import {useState} from "react";
import VisitorInfo from "../../../../components/user-partner/VisitorInfo";
import Transcript from "../../../../components/user-partner/Transcript";
import ChatLogs from "./ChatLogs";
import BanButton from "../../../../components/user-partner/BanButton";

const HistoryChat = ({chat}) => {
    const [page, setPage] = useState(0);

    return(
        <>
            <div className="tabs">
                <button onClick={() => page !== 0 ? setPage(0): ''} className={page === 0 ? 'active': ''}>
                    transcript
                </button>
                <button onClick={() => page !== 1 ? setPage(1): ''} className={page === 1 ? 'active': ''}>
                    visitor info
                </button>
                <button onClick={() => page !== 2 ? setPage(2): ''} className={page === 2 ? 'active': ''}>
                    chat logs
                </button>
            </div>
            <div className="history-chat-body">
                {[
                    <Transcript companionId={chat.visitor.userPartner._id}/>,
                    <div className="visitor-info">
                        <VisitorInfo banButton={<BanButton companionId={chat.visitor.userPartner._id}/>}
                            userPartner={chat.visitor.userPartner} chatsPastLength={chat.visitor.chatsPast.length}/>
                    </div>,
                    <ChatLogs logUsers={chat.transcript.logUsers} logs={chat.transcript.logs} />
                ][page]}
            </div>
        </>
    )
};

export default HistoryChat;