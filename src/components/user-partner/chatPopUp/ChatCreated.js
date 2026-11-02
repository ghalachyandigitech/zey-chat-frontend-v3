import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

const ChatCreated = ({_id, collection}) => {
    const [iterator, setIterator] = useState(0);
    const {companionCreated} = useSelector(state => state.chats.list[collection+_id]);

    useEffect(() => {
        const intervalId = setInterval(() => setIterator(iterator + 1), 60*1000);

        return () => clearInterval(intervalId);
    }, []);


    return(
        <>
            {!companionCreated ? '0' : Math.round((Date.now() - new Date(companionCreated).getTime())/1000/60) + ' '}
        </>
    )
};

export default ChatCreated;
