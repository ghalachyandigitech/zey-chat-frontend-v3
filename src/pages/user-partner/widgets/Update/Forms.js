import {updateForms} from "../../../../controllers/user-partner/WidgetsController";
import {setFlashPopUp} from "../../../../reducers/flashPopUpSlice";
import {setPopUp} from "../../../../reducers/popUpSlice";
import CheckBox from "../../../../components/CheckBox";
import Input from "../../../../components/Input";
import {discard, setForm, updateSelected} from "../../../../reducers/user-partner/widgetsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

const Forms = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const {_id, offlineGreeting, greetingMessage} = useSelector(state => state.widgets.selected);

    return(
        <>
            <h3>Pre-chat form</h3>
            <div className="input-group">
                <Input name="pre-chat" value={greetingMessage} setValue={(value) => dispatch(setForm(['greetingMessage', value]))}/>
                <CheckBox name="require visitors to complain a form before starting chat" checked={offlineGreeting}
                    onChange={async checked => dispatch(setForm(['offlineGreeting', checked]))}/>
            </div>
            <div className="input-group">
                <button className="button" onClick={async () => {
                    setLoad(true);

                    const [error] = await updateForms({_id, offlineGreeting, greetingMessage});

                    setLoad(false);

                    if(Object.keys(error).length) return;

                    dispatch(updateSelected('forms'));
                    dispatch(setPopUp([0]));
                    dispatch(setFlashPopUp('widget forms updated'));
                }}>update</button>
                <button className="button" onClick={() => dispatch(discard('forms'))}>discard</button>
            </div>
        </>
    )
};

export default Forms;