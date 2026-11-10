import {useState} from "react";
import {DATE_OPTIONS} from "../../../Constants";
import {LoadingGif} from "../../../Icons";
import {getTranscript} from "../../../controllers/user-partner/ChatsController";
import {setTranscript} from "../../../reducers/user-partner/transcriptSlice";
import Transcript from "../Transcript";
import {useDispatch} from "react-redux";

const PastChats = ({chatsPast, companionId}) => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    return(
        <>
            {!chatsPast && <LoadingGif /> || <>
                <div className="table">
                    <table>
                        <thead><tr><th>agent</th><th>time</th></tr></thead>
                        <tbody>
                        {chatsPast.map(chat =>
                            <tr key={chat._id} onClick={async () => {
                                setLoad(true);

                                const [error, payload] = await getTranscript(chat._id);

                                setLoad(false);

                                if(Object.keys(error).length) return;

                                dispatch(setTranscript(payload));
                            }}>
                                <td>{chat.agentName}</td>
                                <td>{new Date(chat.createdAt).toLocaleDateString(...DATE_OPTIONS)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    {!chatsPast.length && <div>result not found</div>}
                </div>
                <div className="view">
                    {(load && <LoadingGif />) || <Transcript companionId={companionId} />}
                </div>
            </>}
        </>
    )
};

export default PastChats;