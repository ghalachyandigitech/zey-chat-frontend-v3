import {useSelector, useDispatch} from 'react-redux';
import {CloseSvg, MinimizeSvg} from "../../../Icons";
import {setPopUp} from "../../../reducers/popUpSlice";
import {chatPopupClose} from "../../../reducers/user-partner/chatPopupSlice";

const Header = ({_id, collection}) => {
    const dispatch = useDispatch();
    const chat = useSelector(state => state.chats.list[collection+_id]);

    const {name, styles: {headerLeftColor, headerDegree, headerRightColor}} = chat.widget;

    return (
        <div className={`header`} style={{background: !headerLeftColor && 'black' ||
                `linear-gradient(${headerDegree}deg, ${headerLeftColor}, ${headerRightColor})`
            }}>
            <span>{chat.companionName}</span>
            <CloseSvg onButtonClick={() => dispatch(setPopUp(['chats/end', chat]))} />
            <MinimizeSvg onButtonClick={() => dispatch(chatPopupClose())} />
        </div>
    )
};

export default Header;