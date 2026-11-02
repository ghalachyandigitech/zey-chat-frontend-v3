import {useEffect, useState} from "react";
import PastChats from "./PastChats";
import Messages from "./Messages";
import Messaging from "./Messaging";
import VisitorInfo from "../VisitorInfo";
import {getVisitor} from "../../../controllers/user-partner/UserPartner";
import VisitorInfoButtons from "./VisitorInfoButtons";
import ChatCreated from "./ChatCreated";
import Tabs from "../../Tabs";

const VisitorChat = ({_id, messaging, collection, companionId}) => {
    const [visitor, setVisitor] = useState({});
    const [page, setPage] = useState(0);

    useEffect(() => {
        (async () => {//todo amen angam visitori infon request a anum karoxa petq a cache pahel
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
                [1, `past chats (${visitor.chatsPast ? visitor.chatsPast.length : ''})`]
            ]} />
            <div className="body">
                {[
                    <>
                        <div className="chat">
                            <Messages _id={_id} collection={collection} messagesStatus={true} />
                            {messaging && <Messaging _id={_id} collection={collection} />}
                        </div>
                        <VisitorInfo userPartner={visitor.userPartner} chatsPastLength={visitor.chatsPast?.length}
                             chatCreated={<ChatCreated _id={_id} collection={collection}/>}
                             buttons={<VisitorInfoButtons _id={_id} collection={collection} />}/>
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