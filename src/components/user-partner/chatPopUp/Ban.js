import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPopUp} from "../../../reducers/popUpSlice"
import {setCompanionBanUpdatedAt} from "../../../reducers/user-partner/chatsSlice"
import Input from "../../../components/Input";
import {setBan} from "../../../controllers/UserPartner";

const Ban = () => {
    const dispatch = useDispatch();
    const {userPartnerId} = useSelector(state => state.popUp.payload);
    const [reason, setReason] = useState('');
    const [time, setTime] = useState(1);

    return (
        <div className="input-groups-column">
            <Input name="reason" value={reason} setValue={setReason} />
            <label><input value="1" onChange={e => setTime(e.target.value*1)} checked={time === 1}
                          type="radio" name="time"/> 1 day</label>
            <label><input value="7" onChange={e => setTime(e.target.value*1)} checked={time === 7}
                          type="radio" name="time"/> 7 day</label>
            <label><input value="1000000" onChange={e => setTime(e.target.value*1)} checked={time === 1000000}
                          type="radio" name="time"/> always</label>
            <button className="button" onClick={e => {
                e.stopPropagation();

                setBan(userPartnerId, time, reason);
                setTime(1);
                setReason('');
                dispatch(setCompanionBanUpdatedAt({userPartnerId, companionBanUpdatedAt: 'loading'}));
                // dispatch(setVisitorBanned({userPartnerId, banExpire: 'loading'}));
                dispatch(setPopUp(0));
            }}>ban</button>
        </div>
    )
};

export default Ban;