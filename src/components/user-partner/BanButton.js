import {useDispatch, useSelector} from "react-redux";
import {setBan} from "../../controllers/user-partner/UserPartner";
import {setPopUp} from "../../reducers/popUpSlice";

const BanButton = ({companionId}) => {
    const dispatch = useDispatch();
    const visitor = useSelector(state => state.visitorsBanned.list.find(({_id}) => _id === companionId));
    const {banButton} = useSelector(state => state.userPartner.config);
    const banButtonAction = !banButton ? '' : visitor ? 'unban' : 'ban';

    return(
        <>
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

export default BanButton;