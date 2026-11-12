import {useDispatch, useSelector} from "react-redux";
import {setNotification} from "../../reducers/user-partner/windowNotificationsSlice";
import {useEffect} from "react";

function notification(text){
    if(Notification.permission !== 'granted'){
        Notification.requestPermission().then((permission) => {
            if(permission === "granted") new Notification(text);
        });
    }else{
        new Notification(text);
    }
}

const WindowNotifications = () => {
    const dispatch = useDispatch();
    const {messageFlag, requestFlag} = useSelector(state => state.profile);
    const name = useSelector(state => state.windowNotifications.name);
console.log(messageFlag)
    useEffect(() => {
        if(name){
            if(messageFlag && name === 'message') notification('message');
            else if(requestFlag && name === 'request') notification('request');

            dispatch(setNotification(''));
        }
    }, [name]);
};

export default WindowNotifications;