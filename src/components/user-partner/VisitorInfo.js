import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateNote} from "../../controllers/user-partner/UserPartner";
import {setFlashPopUp} from "../../reducers/flashPopUpSlice";
import Textarea from "../Textarea";
import {LoadingGif} from "../../Icons";
import {NOTE_SAVE_TIMEOUT} from "../../Constants";

let noteTimeoutId = null;

const VisitorInfo = ({userPartner, chatsPastLength, buttons, chatCreated}) => {
    const dispatch = useDispatch();
    const [note, setNote] = useState(userPartner ? userPartner.note : '');

    return (
        <div className="visitor-info">
            {!userPartner && <LoadingGif /> || <>
                <Textarea name="note" value={note} setValue={value => {
                    setNote(value);
                    clearTimeout(noteTimeoutId);
                    noteTimeoutId = setTimeout(async () => {
                        const [error] = await updateNote(value, userPartner._id);
                        if(!Object.keys(error).length) dispatch(setFlashPopUp('note updated'));
                    }, NOTE_SAVE_TIMEOUT);
                }}/>
                <div className="user-partner-info">
                    <div><div>{userPartner.visits}</div><div>past visits</div></div>
                    <div><div>{chatsPastLength}</div><div>past chats</div></div>
                    <div>
                        <div>
                            {chatCreated ? chatCreated : '0'} minutes
                        </div>
                        <div>on site</div>
                    </div>
                </div>
                <div className="buttons">{buttons}</div>
                <div className="referrers">
                    {userPartner.referrers && userPartner.referrers.map(referrer => <div key={Math.random()}>{referrer}</div>)}
                </div>
                <div className="location-info">
                    <div><b className="title">location:</b><span className="description">{userPartner.location}</span></div>
                    <div><b className="title">browser:</b><span className="description">{userPartner.browser}</span></div>
                    <div><b className="title">platform:</b><span className="description">{userPartner.platform}</span></div>
                    <div><b className="title">ip address:</b><span className="description">{userPartner.ip}</span></div>
                    <div><b className="title">user agent:</b><span className="description">{userPartner.userAgent}</span></div>
                </div>
            </>}
        </div>
    )
};

export default VisitorInfo;