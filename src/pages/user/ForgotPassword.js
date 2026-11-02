import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {forgotPassword} from "../../controllers/user/User";
import {setFlashPopUp} from "../../reducers/flashPopUpSlice";
import Input from "../../components/Input";
import {EmailImg} from "../../Icons";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState({});

    if(!load) return (
        <>
            <div className="create-password">
                <div className="welcome-back">reset password</div>
                {error.server}
                <div className="login-input">
                    <div>
                        <EmailImg />
                        <input placeholder="email Address" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <span className="error">{error.email && error.email}</span>
                </div>
                <button className="button" onClick={async () => {
                    setLoad(true);

                    setError({});

                    const [error] = await forgotPassword({email});

                    setLoad(false);

                    if(Object.keys(error).length) return setError(error);

                    dispatch(setFlashPopUp('email sent'));
                }}>reset</button>
            </div>

        </>
    )
};

export default ForgotPassword;