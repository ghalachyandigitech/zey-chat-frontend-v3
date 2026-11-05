import {useDispatch, useSelector} from "react-redux";
import {setPopUp} from "../reducers/popUpSlice";
import {CloseSvg} from "../Icons";
import {PAGES_NAMES} from "../Constants";

const PopUp = ({routes}) => {
    const dispatch = useDispatch();
    const {name, type} = useSelector(state => state.popUp);

    if(name) return (
        <div className="pop-up" style={{zIndex: 2}} onClick={e => {if(e.target.classList.contains('pop-up')) dispatch(setPopUp(0))}}>
            <div className="container">
                <div className={`header header-${type}`}>
                    {PAGES_NAMES[name]}<CloseSvg onButtonClick={e => e.stopPropagation() & dispatch(setPopUp(0))} />
                </div>
                <div className="body">
                    {routes[name]}
                </div>
            </div>
        </div>
    )
};

export default PopUp;