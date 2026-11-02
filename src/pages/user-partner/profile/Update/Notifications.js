import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateNotification} from "../../../../controllers/profile/Agents";
import {setFlashPopUp} from "../../../../reducers/flashPopUpSlice";
import {updateFlag} from "../../../../reducers/user-partner/profileSlice";
import {LoadingGif} from "../../../../Icons";

const Notifications = () => {
    const dispatch = useDispatch();
    const {messageFlag, requestFlag} = useSelector(state => state.profile);
    const [load, setLoad] = useState(false);

    async function update(data){
        setLoad(true);

        const [error] = await updateNotification(data);

        setLoad(false);

        if(Object.keys(error).length) return setFlashPopUp('notification update error');

        dispatch(updateFlag(data));
        dispatch(setFlashPopUp('notifications updated'))
    }

    return(
        <div className="notifications">
            <h2>notifications</h2>
            <p>Set your notification preferences for when you are in or away from the dashboard. You will need to configure your browser settings to allow notifications from digitech.am.</p>
            {(load && <LoadingGif />) || <>
                <div>
                    <span>new message</span>
                    <label>
                        <input type="checkbox" checked={messageFlag} onChange={e => update({
                            flagName: 'messageFlag',
                            flagValue: e.target.checked*1
                        })} />
                        Show notification for incoming chat request
                    </label>
                </div>
                <div>
                    <span>new request</span>
                    <label>
                        <input type="checkbox" checked={requestFlag} onChange={e => update({
                            flagName: 'requestFlag',
                            flagValue: e.target.checked*1
                        })} />
                        Show notification for new messages in open chats
                    </label>
                </div>
                <div>
                    <span>status change</span>
                    <label>
                        <input type="checkbox" />
                        Show notification for automatic status changes
                    </label>
                </div>
            </>}
        </div>
    )
};

export default Notifications;