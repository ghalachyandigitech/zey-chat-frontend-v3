import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Select from "../../../../components/Select";
import {discard, setSetting, updateSelected} from "../../../../reducers/user-partner/widgetsSlice";
import {setPopUp} from "../../../../reducers/popUpSlice";
import {setFlashPopUp} from "../../../../reducers/flashPopUpSlice";
import {updateSettings} from "../../../../controllers/user-partner/WidgetsController";

const Settings = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const {_id, language, isRatingEnabled, notificationSound} = useSelector(state => state.widgets.selected);

    return(
        <div className="widget-settings">
            <h3>general preferences</h3>
            <div className="row">
                <span>language</span>
                <div>
                    <Select value={language} options={[['en', 'english']]}
                            onChange={value => dispatch(setSetting(['language', value]))}/>
                    <span className="note">Note: The selected language is not displayed in the preview.</span>
                </div>
            </div>
            <div className="row">
                <span>notification sounds</span>
                <label>
                    <input type="checkbox" checked={notificationSound}
                           onChange={e => dispatch(setSetting(['notificationSound', e.target.checked]))}/>
                    play a sound for the visitor when a new message is received
                </label>
            </div>
            <h3>satisfaction ratins</h3>
            <div className="row">
                <span>enable satisfaction ratings</span>
                <label>
                    <input type="checkbox" checked={isRatingEnabled}
                           onChange={e => dispatch(setSetting(['isRatingEnabled', e.target.checked]))}/>
                    allow visitors to rate their chats with your agents.
                </label>
            </div>
            <div className="input-group">
                <button className="button" onClick={async () => {
                    setLoad(true);

                    const [error] = await updateSettings({_id, language, notificationSound, isRatingEnabled});

                    setLoad(false);

                    if(Object.keys(error).length) return;

                    dispatch(updateSelected('settings'));
                    dispatch(setPopUp([0]));
                    dispatch(setFlashPopUp('widget settings updated'));
                }}>update</button>
                <button className="button" onClick={() => dispatch(discard('settings'))}>discard</button>
            </div>
        </div>
    )
};

export default Settings;