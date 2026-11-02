import {useSelector} from "react-redux";

const BanMessage = ({_id, collection}) => {
    const {companionBanUpdatedAt} = useSelector(state => state.chats.list[collection+_id]);

    return (
        <>
            {companionBanUpdatedAt && <div className="center">
                <div className="message">
                    visitor is banned
                    <span className="date">{companionBanUpdatedAt}</span>
                </div>
            </div>}
        </>
    )
};

export default BanMessage;