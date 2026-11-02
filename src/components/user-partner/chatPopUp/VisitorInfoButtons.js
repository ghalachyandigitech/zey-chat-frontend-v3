import {useDispatch, useSelector} from "react-redux";
import {setFile, setTransfer} from "../../../controllers/user-partner/ChatsController";
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice";
import {setChatStatus} from "../../../reducers/user-partner/chatsSlice";
import {setBan} from "../../../controllers/user-partner/UserPartner";
import {setPopUp} from "../../../reducers/popUpSlice";

const VisitorInfoButtons = ({_id, collection}) => {
    const dispatch = useDispatch();
    const {status, companionId, file, companionBanUpdatedAt} = useSelector(state => state.chats.list[collection+_id]);
    const {banButton, transferRequests, attachFileButton} = useSelector(state => state.userPartner.config);

    const banButtonAction = !banButton ? '' : companionBanUpdatedAt ? 'unban' : 'ban';

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
            {banButtonAction && <button onClick={() => {
                if(banButtonAction === 'ban'){
                    dispatch(setPopUp(['ban', {userPartnerId: companionId}]))
                }else if(banButtonAction === 'unban'){
                    setBan(companionId, 0);
                }
            }}>{banButtonAction}</button>}
        </>
    )
};

export default VisitorInfoButtons;