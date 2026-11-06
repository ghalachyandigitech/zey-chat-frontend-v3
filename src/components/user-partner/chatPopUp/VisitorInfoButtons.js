import {useDispatch, useSelector} from "react-redux";
import {setFile, setTransfer} from "../../../controllers/user-partner/ChatsController";
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice";
import {setChatStatus} from "../../../reducers/user-partner/chatsSlice";
import {setPopUp} from "../../../reducers/popUpSlice";

const VisitorInfoButtons = ({_id, collection}) => {
    const dispatch = useDispatch();
    const {status, file} = useSelector(state => state.chats.list[collection+_id]);
    const {transferRequests, attachFileButton} = useSelector(state => state.userPartner.config);

    let fileAction = '';
    let transferButtonAction = '';
    if(status !== 5){
        fileAction = !file || !attachFileButton ? '' : file === 2 ? 'disable': 'enable';
        transferButtonAction = transferRequests ? 'transfer-rapid' : status === 2 ? 'transfer' : status === 3 ? 'transfer-sent' : '';
    }

    return(
        <>
            {transferButtonAction && <button className={transferButtonAction === 'transfer-sent' && 'button-wait'} onClick={() => {
                if(transferButtonAction === 'transfer'){
                    setTransfer(_id);
                    dispatch(setChatStatus({_id, status: 3}));
                    dispatch(setFlashPopUp('transfer request sent'));
                }else if(transferButtonAction === 'transfer-rapid'){
                    dispatch(setPopUp(['transfer', {_id}]));
                }
            }}>transfer chat</button>}
            {fileAction && <button onClick={() => setFile(_id)}>attache {fileAction}</button>}
        </>
    )
};

export default VisitorInfoButtons;