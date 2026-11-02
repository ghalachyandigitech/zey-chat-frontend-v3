import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../../components/Input";
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice";
import {subscribe} from "../../../controllers/user-partner/WidgetsController";

const GettingStarted = () => {
    const dispatch = useDispatch();
    const {selected, script} = useSelector(state => state.widgets);
    const partnerId = useSelector(state => state.userPartner.partnerId);
    const [email, setEmail] = useState('');
    const [error, setError] = useState({});
    const [load, setLoad] = useState(false);

    return(
        <>
            <h3>embed the partner Chat widget</h3>
            <p>copy the following script and insert it into your website's HTML source code between the tags</p>
            <button className="button" onClick={() => {
                navigator.clipboard.writeText(script);
                dispatch(setFlashPopUp('script copied'))
            }}>copy script to clipboard</button>
            <div className="widget-script" onClick={(e) => {
                const range = document.createRange();
                range.selectNode(e.target);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }}>{script.replace('{{partnerId}}', partnerId).replace('{{_id}}', selected._id)}</div>
            <h3>cmail your developer</h3>
            <p>copy the following script and insert it into your website's HTML source code between the &#60;head&#62; tags</p>
            {error.server && <span className="error">{error.server}</span>}
            <div className="input-group">
                <Input name="email" value={email} setValue={setEmail} error={error.email} />
                <button className="button" onClick={async () => {
                    setLoad(true);

                    const [error] = await subscribe({_id: selected._id, email});

                    setLoad(false);

                    if(Object.keys(error).length) return setError(error);

                    setError({});
                    setEmail('');
                    dispatch(setFlashPopUp('widget sent to email'));
                }}>send</button>
            </div>
        </>
    )
};

export default GettingStarted;