import {login} from '../../controllers/user/User';
import {useState} from "react";
import {useNavigate} from "react-router";
import {setUser} from "../../reducers/user/userSlice";
import {useDispatch} from "react-redux";
import {EmailImg, PasswordImg} from "../../Icons";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-page">
            <div>
                <div className="welcome-back">Welcome back</div>
                <span className="error">{error.server && error.server}</span>
                {load && <div>test load</div>}
                <div className="login-input">
                    <div>
                        <EmailImg />
                        <input placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <span className="error">{error.email && error.email}</span>
                </div>
                <div className="login-input">
                    <div>
                        <PasswordImg />
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <span className="error">{error.password && error.password}</span>
                </div>
                <div className="forgot-password">forgot password?</div>
                <button className="button" onClick={async () => {
                    setLoad(true);
                    setError({});

                    const [error, payload] = await login({email, password});

                    setLoad(false);

                    if(Object.keys(error).length) return setError(error);

                    dispatch(setUser(payload));

                    navigate('/');
                }}>login</button>
            </div>
        </div>
    )
};

export default Login;