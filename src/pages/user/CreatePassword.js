import {useEffect, useState} from 'react';
import {resetToken, createPassword} from "../../controllers/user/User";
import {useNavigate, useLocation} from "react-router-dom";
import {PasswordImg} from "../../Icons";
// import {auth} from "../../controllers/user/User";

const CreatePassword = () => {
    const [load, setLoad] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [confirmPassword, setConfirmPassword] = useState('');
    const {pathname} = useLocation();
    const token = pathname.split('/')[2];
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {

            setLoad(false);
        })();
    }, []);

    if(!load) return (
        <div className="create-password">
            <div className="welcome-back">create password</div>
            {error.server}
            <div className="login-input">
                <div>
                    <PasswordImg />
                    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <span className="error">{error.password && error.password}</span>
            </div>
            <div className="login-input">
                <div>
                    <PasswordImg />
                    <input type="password" placeholder="confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                </div>
                <span className="error">{error.confirmPassword && error.confirmPassword}</span>
            </div>
            <button className="button" onClick={async () => {
                setLoad(true);

                setError({});

                const [error] = await createPassword({token, password, confirmPassword});

                setLoad(false);

                if(Object.keys(error).length) return setError(error);

                navigate('/');
            }}>log in</button>
        </div>
    )
};

export default CreatePassword;