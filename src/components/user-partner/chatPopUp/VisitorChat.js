import {useEffect, useState} from "react";
import PastChats from "./PastChats";
import Messages from "./Messages";
import Messaging from "./Messaging";
import VisitorInfo from "../VisitorInfo";
import {getVisitor} from "../../../controllers/user-partner/UserPartner";
import VisitorInfoButtons from "./VisitorInfoButtons";
import ChatCreated from "./ChatCreated";
import Tabs from "../../Tabs";
import BanButton from "../BanButton";
import {useSelector} from "react-redux";

const VisitorChat = ({_id, messaging, collection, companionId}) => {
    const [visitor, setVisitor] = useState({});
    const [page, setPage] = useState(0);
    const visitorBanned = useSelector(state => state.visitorsBanned.list.find(({_id}) => _id === companionId));
    const banUpdatedAt = visitorBanned && visitorBanned.updatedAt;
    const chatsPastLength = visitor.chatsPast ? visitor.chatsPast.length : '';

    useEffect(() => {
        (async () => {
            setVisitor({});

            const [error, payload] = await getVisitor(companionId);//todo error@ brnel datark userPartner null

            if(Object.keys(error).length) return;

            setVisitor(payload);
        })()
    }, []);

    return (
        <>
            <Tabs page={page} setPage={setPage} tabs={[
                [0, 'current chat'],
                [1, `past chats (${chatsPastLength})`]
            ]} />
            <div className="body">
                {[
                    <>
                        <div className="chat">
                            <Messages banUpdatedAt={banUpdatedAt} _id={_id} collection={collection} messagesStatus={true} />
                            {messaging && !banUpdatedAt && <Messaging _id={_id} collection={collection} />}
                        </div>
                        <VisitorInfo userPartner={visitor.userPartner} chatsPastLength={chatsPastLength}
                             chatCreated={<ChatCreated _id={_id} collection={collection}/>}
                             buttons={[
                                 <BanButton key="ban" companionId={companionId}/>,
                                 <VisitorInfoButtons key="file" _id={_id} collection={collection} />
                             ]}
                        />
                    </>,
                    <div className="past-chats">
                        <PastChats companionId={companionId} chatsPast={visitor.chatsPast} />
                    </div>
                ][page]}
            </div>
        </>
    )
};

export default VisitorChat;