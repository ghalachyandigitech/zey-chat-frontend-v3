import {useState} from "react";
import {DATE_OPTIONS} from "../../../Constants";
import {LoadingGif} from "../../../Icons";
import {getTranscript} from "../../../controllers/user-partner/ChatsController";
import Transcript from "../Transcript";

const PastChats = ({chatsPast, companionId}) => {
    const [load, setLoad] = useState(false);
    const [transcript, setTranscript] = useState(null);

    return(
        <>
            {!chatsPast && <LoadingGif /> || <>
                <div className="table">
                    <table>
                        <thead><tr><th>agent</th><th>time</th></tr></thead>
                        <tbody>
                        {chatsPast.map(chat =>
                            <tr onClick={async () => {
                                setLoad(true);

                                const [error, payload] = await getTranscript(chat._id);

                                setLoad(false);

                                if(Object.keys(error).length) return;

                                setTranscript(payload);
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
                    {(load && <LoadingGif />) || (transcript && <Transcript transcript={transcript} companionId={companionId} />)}
                </div>
            </>}
        </>
    )
};

export default PastChats;