import {ClockSvg, LoadingGif, TypingSvg} from "../../../Icons";
import File from "../../File";
import MessageStatus from "./MessageStatus";
import {page} from "../../../controllers/user-partner/MessagesController";
import {setPageLoad} from "../../../reducers/user-partner/chatsMessagesSlice";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useRef} from "react";
import {REG_EXP_URL_DETECT, REG_EXP_PERSIAN_FONT} from "../../../Constants";

const Messages = ({_id, collection, messagesStatus, banUpdatedAt}) => {
    const dispatch = useDispatch();
    const messagesRef = useRef(null);
    const messagesEndRef = useRef(null);
    const {messages: [messages, ended], pageLoad, companionTyping} = useSelector(state => state.chatsMessages.list[collection+_id]);

    const scrollToDown = (height) => {
        if(messagesEndRef && messagesEndRef.current && messagesRef && messagesRef.current){
            const {bottom} = messagesRef.current.getBoundingClientRect();
            const {current} = messagesEndRef;

            if(!height || (bottom + height > current.getBoundingClientRect()['bottom'])) current.scrollIntoView();
        }
    };

    useEffect(() => scrollToDown, []);
    useEffect(() => {scrollToDown(100)}, [messages, companionTyping]);

    return (
        <div className="messages" ref={messagesRef} onScroll={({target}) => {
            const {height} = target.getBoundingClientRect();
            const {scrollTop, scrollHeight} = target;

            if(scrollTop === 0 && !ended && !pageLoad && scrollHeight > height){
                dispatch(setPageLoad({_id, collection}));
                page(_id, messages[0]['id']);
            }
        }}>
            <div>{pageLoad && <LoadingGif width="40"/>}</div>
            {messages && messages.map(({id, text, file, date, hashId, side}) =>
                <div className={side}>
                    <span> </span>
                    <div className={`message`}>
                        {file[0] && <div className="file"><File value={file} /></div>}
                        <span className={text[0] && REG_EXP_PERSIAN_FONT.test(text[0][0]) && 'rtl'}>
                            {text.map(t => REG_EXP_URL_DETECT.test(t) ? <a style={{display: 'contents'}} target="_blank" href={t}>{t}</a> : t)}
                        </span>
                        <span className="date">
                            {date}
                            {messagesStatus && side === 'right' && <>
                                {hashId && <ClockSvg/> || <MessageStatus _id={_id} messageId={id}/>}
                            </>}
                        </span>
                    </div>
               </div>
            )}
            {banUpdatedAt && <div className="center">
                <div className="message">
                    visitor is banned
                    <span className="date">{banUpdatedAt}</span>
                </div>
            </div>}
            {companionTyping && <div className="left">
                <span> </span>
                <div className="message"><TypingSvg /></div>
            </div>}
            <div ref={messagesEndRef}> </div>
        </div>
    )
};

export default Messages;