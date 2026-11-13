import {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {FileUploadSvg, MessageSendSvg} from "../../../Icons";
import {set, setTyping} from "../../../controllers/user-partner/MessagesController";
import {setChatMessage} from "../../../reducers/user-partner/chatsMessagesSlice";
import {setDraft} from "../../../reducers/user-partner/chatsSlice";
import FileUpload1 from "../../../components/FileUpload1";
import {REG_EXP_PERSIAN_FONT, TYPING_OFF_TIMEOUT} from "../../../Constants";

let typingSetTimeout = null;

const Messaging = ({_id, collection}) => {
    const dispatch = useDispatch();
    const messageTextarea = useRef(null);
    const fileInput = useRef(null);
    const [error, setError] = useState({});
    const [textareaDirection, setTextareaDirection] = useState('ltr');
    const [shortcutsTag, setShortcutsTag] = useState('');
    const [shortcutHovered, setShortcutHovered] = useState(-1);
    const [uploadFile, setUploadFile] = useState(['', '']);
    const {file, draft} = useSelector(state => state.chats.list[collection+_id]);
    const {userPartnerId: authUserPartnerId, shortcuts} = useSelector(state => state.userPartner);

    useEffect(() => {
        if(REG_EXP_PERSIAN_FONT.test(draft[0])){
            setTextareaDirection('rtl')
        }
        return () => {
            if(typeof messageTextarea.draft === 'string'){
                return dispatch(setDraft({collection, _id, draft: messageTextarea.draft}));
            }
        }
    }, []);

    const typingOff = () => {
        clearTimeout(typingSetTimeout);
        typingSetTimeout = null;
    };

    const typing = () => {
        if(typingSetTimeout){
            clearTimeout(typingSetTimeout);
        }else{
            setTyping(_id, true);
        }
        typingSetTimeout = setTimeout(() => {
            setTyping(_id, false);
            typingOff()
        }, TYPING_OFF_TIMEOUT)
    };

    function sendMessage(){
        setError({});

        const message = {
            hashId: Math.random().toString(32).slice(2),
            userId: authUserPartnerId,
            message: messageTextarea.current.value,
            file: file && fileInput.current.value ? [
                fileInput.current.files[0].type,
                fileInput.current.files[0]
            ] : ['', '']
        };

        const [error] = set(_id, message);
        if(Object.keys(error).length) return;

        fileInput.current.value = '';
        messageTextarea.current.value = '';
        delete messageTextarea.draft;
        setUploadFile(['', '']);

        message.file = message.file[0] ? '.loading' : '';
        dispatch(setChatMessage({_id, message}));
        typingOff();
    }

    return(
        <>
            <div className="messaging">
                <textarea defaultValue={draft} ref={messageTextarea} style={{direction: textareaDirection}}
                    onKeyDown={e => {
                        if(!['ArrowUp', 'ArrowDown', 'Enter'].includes(e.key) || e.shiftKey) return;

                        e.preventDefault();

                        if(shortcutsTag){
                            if(!shortcuts.length) return;

                            if(e.key === 'ArrowUp'){
                                setShortcutHovered(shortcutHovered - 1 < 0 ? shortcuts.length - 1 : shortcutHovered - 1)
                            }else if(e.key === 'ArrowDown'){
                                setShortcutHovered(shortcutHovered + 1 === shortcuts.length ? 0: shortcutHovered + 1)
                            }else if(shortcutHovered > -1){
                                e.target.value = shortcuts[shortcutHovered].message;
                                messageTextarea.draft = shortcuts[shortcutHovered].message;
                                setShortcutsTag('');
                            }
                        }else if(e.key === 'Enter'){
                            return sendMessage();
                        }
                    }}
                    onChange={e => {
                        const value = e.target.value;
                        messageTextarea.draft = value;

                        typing();

                        if(value[0] === '/'){
                            setShortcutsTag(e.target.value.slice(1));
                            setShortcutHovered(-1);
                        }else if(value.length <= 1){
                            setTextareaDirection(REG_EXP_PERSIAN_FONT.test(value[0]) ? 'rtl' : 'ltr');
                        }
                    }}
                />
                {file && <FileUpload1 value={uploadFile} setValue={setUploadFile} fileInput={fileInput}/>}
                <div className="messaging-controller">
                    {file > 0 && <FileUploadSvg onButtonClick={() => fileInput.current.click()} />}
                    <MessageSendSvg onButtonClick={sendMessage} />
                </div>
            </div>
            {shortcutsTag.length > 0 && <div className="shortcuts">
                <div>
                    {shortcuts.filter(i => i.tag.indexOf(shortcutsTag) > -1).map((shortcut, index) => (
                        <div className={index === shortcutHovered ? 'shortcut-hovered': ''}>{shortcut.message}</div>
                    ))}
                </div>
            </div>}
        </>
    )
};

export default Messaging;