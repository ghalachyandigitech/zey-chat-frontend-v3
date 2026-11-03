import {getPage} from "../../../controllers/user-partner/HistoriesController";
import {useState, useEffect} from "react";
import {dateRange} from "../../../helpers/dateHelper";

import HistoryChat from "./HistoryChat";
import {getVisitor} from "../../../controllers/user-partner/UserPartner";
import {getTranscript} from "../../../controllers/user-partner/ChatsController";
import {LoadingGif} from "../../../Icons";
import {HISTORY_PAGE_ITEMS_COUNT} from '../../../Constants';
import Pagination from "../../../components/Pagination";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import InputDate from "../../../components/Datepicker";

const Read = () => {
    const [load, setLoad] = useState(false);
    const [date, setDate] = useState(dateRange.today());
    const [range, setRange] = useState('today');
    const [page, setPage] = useState(1);
    const [visitorId, setVisitorId] = useState('');
    const [agentName, setAgentName] = useState('');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);
    const [status, setStatus] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [chats, setChats] = useState([]);
    const [historyChat, setHistoryChat] = useState(null);
    
    const get = async () => {
        setLoad(true);
        
        const [error, payload] = await getPage({
            dateFrom: new Date(date[0]).toISOString(), dateTo: new Date(date[1]).toISOString(),
            page, visitorId, agentName, message, rating, status
        });

        setLoad(false);

        if(Object.keys(error).length) return;

        setChats(payload.data);
        setTotalCount(payload.count);
    };

    useEffect(() => {get()}, [page]);
    
    console.log('History component');

    return(
        <>
            <div className="input-group">
                <Select value={range} setValue={(v) => {setDate(dateRange[v]); setRange(v);}} className="input-mini" options={[
                     ['today', 'today'],
                     ['yesterday', 'yesterday'],
                     ['current-week', 'current week'],
                     ['current-month', 'current month'],
                     ['last-six-months', 'last 6 months']
                 ]} />
                <InputDate value={date[0]} onChange={(value) => setDate([value, date[1]])}/>
                <InputDate value={date[1]} onChange={(value) => setDate([value, date[0]])}/>
                <Select name="status" value={status} setValue={v => setStatus(v*1)} className="input-mini" options={[
                    ['0', 'all'],
                    ['5', 'served'],
                    ['6', 'missed']
                ]} />
            </div>
            <div className="input-group">
                <Input name="visitor id" value={visitorId} setValue={setVisitorId} className="input-mini"/>
                <Input name="agent" value={agentName} setValue={setAgentName} className="input-mini"/>
                <Input name="message" value={message} setValue={setMessage} className="input-mini"/>
                <Select name="rating" value={rating} setValue={v => setRating(v*1)} className="input-mini" options={[
                    ['0', 'all'], ['1', '1'],['2', '2'],
                    ['3', '3'], ['4', '4'], ['5', '5']
                ]} />
                <button className="button" onClick={get}>search</button>
                <button className="button" onClick={() => {
                    setPage(1); setVisitorId(''); setMessage('');
                    setAgentName(''); setRating(0); setStatus(0);
                    setRange('today'); setDate(dateRange.today());
                }}>reset</button>
            </div>
            <Pagination page={page} setPage={page => setPage(page)} totalCount={totalCount} PageItemsCount={HISTORY_PAGE_ITEMS_COUNT} />
            <div className="history-body">
                <div className="table">
                    <table>
                        <thead><tr><th>visitor id</th><th>agent</th><th>date</th><th>rating</th></tr></thead>
                        <tbody>
                            {!load && chats.map(chat =>
                                <tr onClick={async () => {
                                    setHistoryChat('loading');

                                    const [
                                        [visitorError, visitor],
                                        [transcriptError, transcript]
                                    ] = await Promise.all([
                                        getVisitor(chat.visitorId),
                                        getTranscript(chat._id)
                                    ]);

                                    if(Object.keys(visitorError).length || Object.keys(transcriptError).length) return; //todo error@ brnel datark userPartner null

                                    // mi hat error grel mi tex arji
                                    setHistoryChat({visitor, transcript})
                                }}>
                                    <td>{chat.visitorName}</td>
                                    <td>{chat.agentsNames.join(', ')}</td>
                                    <td>{chat.createdAt}</td>
                                    <td>{chat.rating}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {(load && <LoadingGif />) || (!chats.length && <div>result not found</div>)}
                </div>
                {historyChat && <div className="history-chat">
                    {(historyChat === 'loading' && <LoadingGif/>) || <HistoryChat chat={historyChat} />}
                </div>}
            </div>
        </>
    )
};

export default Read;