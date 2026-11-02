import {useDispatch, useSelector} from "react-redux";
import {setNotification} from "../../reducers/user-partner/windowNotificationsSlice";

const WindowNotifications = () => {
    const dispatch = useDispatch();
    const {messageFlag, requestFlag} = useSelector(state => state.profile);
    const name = useSelector(state => state.windowNotifications.name);

    if(name){
        if(messageFlag && name === 'message') new Notification('message');
        else if(requestFlag && name === 'request') new Notification('request');

        dispatch(setNotification(''));
    }
};

export default WindowNotifications;