import {useSelector, useDispatch} from 'react-redux';
import {CloseSvg, MinimizeSvg} from "../../../Icons";
import {setPopUp} from "../../../reducers/popUpSlice";
import {chatPopupClose} from "../../../reducers/user-partner/chatPopupSlice";

const Header = ({_id, collection}) => {
    const dispatch = useDispatch();
    const chat = useSelector(state => state.chats.list[collection+_id]);
    const {name, styles} = chat.widget;

    return (
        <div style={{background: !styles.headerLeftColor && 'black' ||
                `linear-gradient(${styles.headerDegree}deg, ${styles.headerLeftColor}, ${styles.headerRightColor})`
            }} className={`header`}>
            <span>{chat.companionName}</span>
            <CloseSvg onButtonClick={() => {
                dispatch(setPopUp(['chats/end', chat]))
            }} />
            <MinimizeSvg onButtonClick={() => dispatch(chatPopupClose())} />
        </div>
    )
};

export default Header;