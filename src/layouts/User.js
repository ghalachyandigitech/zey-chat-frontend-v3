import {useSelector} from 'react-redux';
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import '../css/user/user.css'

const User = () => {
    const user = useSelector(state => !!state.user._id);
    const navigate = useNavigate();

    useEffect(() => {if(!user) navigate('/login')}, []);

    if(user) return (
        <div className="user" style={{
            background: `url('/loginBackground.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className="container">
                <div className="header" style={{
                    background: `url('/loginHeaderBackground.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <img src="/logo.png"/>
                </div>
                <div className="body">
                    <><Outlet /></>
                </div>
            </div>
        </div>
    )
};

export default User;