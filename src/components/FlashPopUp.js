import {useDispatch, useSelector} from "react-redux";
import {setFlashPopUp} from "../reducers/flashPopUpSlice";
import {CloseSvg} from "../Icons";

let CloseSetTimeout = null;

const FlashPopUp = () => {
    const dispatch = useDispatch();
    const flashPopUp = useSelector(state => state.flashPopUp);

    if(flashPopUp.text){
        clearTimeout(CloseSetTimeout);
        CloseSetTimeout = setTimeout(() => dispatch(setFlashPopUp('')), 5000);

        return (
            <div className="flash-pop-up">
                <p><strong>Success! </strong>{flashPopUp.text}</p>
                <CloseSvg width={24} fill="grey" onButtonClick={() => {
                    clearTimeout(CloseSetTimeout);
                    dispatch(setFlashPopUp(''));
                }}/>
            </div>
        )
    }
};

export default FlashPopUp;