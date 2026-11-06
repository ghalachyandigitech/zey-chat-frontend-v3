import { usePDF } from 'react-to-pdf';
import {UploadSvg} from "../../Icons";
import TranscriptMessages from "./TranscriptMessages";

const Transcript = ({companionId}) => {
    const transcriptMessages = <TranscriptMessages companionId={companionId}/>;
    const {toPDF, targetRef} = usePDF({filename: 'page.pdf', page: {format: 'A4'}});

    return (
        <>
            <button className="button" onClick={() => toPDF()}><UploadSvg /></button>
            <div className="transcript-pdf">
                <div style={{width: '21cm'}} ref={targetRef}>
                    {transcriptMessages}
                </div>
            </div>
            <div style={{overflowY: 'auto'}}>
                {transcriptMessages}
            </div>
        </>
    );
};

export default Transcript;