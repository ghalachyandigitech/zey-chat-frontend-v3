import File from "../../components/File";
import {setPopUp} from "../../reducers/popUpSlice"
import {DATE_OPTIONS, REG_EXP_PERSIAN_FONT} from "../../Constants";
import {CloseSvg} from "../../Icons";
import {useDispatch, useSelector} from "react-redux";

const TranscriptMessages = ({companionId}) => {
    const dispatch = useDispatch();
    const transcript = useSelector((state) => state.transcript);

    return (
        <div className="transcript-messages">
            <span>
                rating {transcript.rating ? transcript.rating : '--'}&nbsp;&nbsp;
                date {transcript.createdAt ? new Date(transcript.createdAt).toLocaleDateString(...DATE_OPTIONS) : '--'}
            </span>
            {transcript.messages && transcript.messages.map(({_id, id, userId, message, file, date}) => {
                const side = !userId ? 'center' : userId === companionId ? 'left' : 'right';
                const fileType = file.split('.').reverse()[0];

                if (!userId) {
                    const log = message.split('_');

                    message = transcript.logUsers[log[0]] + ' ' + log[1];
                }

                return (
                    <div className={side === 'center' ? 'message1-center' : `message1 message1-${side}`}>
                        <div>
                            <div style={{direction: REG_EXP_PERSIAN_FONT.test(message[0]) ? 'rtl' : 'ltr'}}>{message}</div>

                            {fileType && <div className="file-container">
                                <div>
                                    <File value={[fileType, file]} error={true} />
                                    <CloseSvg className="close-file-reader" onButtonClick={() => {
                                        dispatch(setPopUp(['histories/delete/file', {messageId: _id}]))
                                    }} />
                                </div>
                            </div>}

                            <div className="date">
                                {date && new Date(date).toLocaleTimeString(...DATE_OPTIONS)}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default TranscriptMessages;