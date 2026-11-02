import '../css/user/login.css'
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {Outlet, useNavigate}from "react-router-dom";

const UserGuest = () => {
    const user = useSelector(state => !!state.user._id);
    const navigate = useNavigate();

    useEffect(() => {if(user) navigate('/')}, []);

    return (
        <div className="user-guest" style={{
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

export default UserGuest;