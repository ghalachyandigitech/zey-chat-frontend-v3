import {login} from '../../controllers/user-super/UserSuperController';
import {useState} from "react";
import {useNavigate} from "react-router";
import {EmailImg, PasswordImg} from "../../Icons";
import {useDispatch} from "react-redux";
import {setUserSuper} from "../../reducers/user-super/userSuperSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-page">
            <div>
                <div className="welcome-back">welcome back</div>
                <span className="error">{error.server && error.server}</span>
                {load && <div>test load</div>}
                <div className="login-input">
                    <div>
                        <EmailImg />
                        <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <span className="error">{error.username && error.username}</span>
                </div>
                <div className="login-input">
                    <div>
                        <PasswordImg />
                        <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <span className="error">{error.password && error.password}</span>
                </div>
                <button className="button" onClick={async () => {
                    setLoad(true);
                    setError({});

                    const [error, user] = await login({username, password});

                    setLoad(false);

                    if(Object.keys(error).length) return setError(error);

                    dispatch(setUserSuper(user));
                    navigate('/super-admin');
                }}>login</button>
            </div>
        </div>
    )
};

export default Login;