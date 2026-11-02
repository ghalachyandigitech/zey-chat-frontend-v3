import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Outlet, useNavigate, useLocation} from "react-router-dom";
import {logOut} from "../controllers/user-super/UserSuperController";
import {setUserSuper} from "../reducers/user-super/userSuperSlice";
import {AdminsSvg, HomeSvg, LogOutSvg, MenuOpenedSvg, PartnersSvg} from "../Icons";
import {PAGES_NAMES} from "../Constants";

import UserAdminsCreate from "../pages/user-super/userAdmins/Create";
import UserAdminsUpdate from "../pages/user-super/userAdmins/Update";
import UserAdminsDelete from "../pages/user-super/userAdmins/Delete";
import PartnersCreate from "../pages/user-super/partners/Create";
import PartnersUpdate from "../pages/user-super/partners/Update";
import PartnersDelete from "../pages/user-super/partners/Delete";

import PopUp from "../components/PopUp";

const UserSuper = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [load, setLoad] = useState(true);
    const [, , segment2] = pathname.split('/');
    const auth = useSelector(state => !!state.userSuper._id);

    useEffect(() => {
        (async () => {
            if(!auth) return navigate('/super-admin/login');

            setLoad(false);
        })();
    }, []);

    if (!load) return (
        <div className="user-partner">
            <PopUp routes={{
                'partners/create': <PartnersCreate />,
                'partners/update': <PartnersUpdate />,
                'partners/delete': <PartnersDelete />,
                'user-admins/create': <UserAdminsCreate />,
                'user-admins/update': <UserAdminsUpdate />,
                'user-admins/delete': <UserAdminsDelete />
            }} />
            <div className="left-menu">
                <div className="header">
                    <span className="circle-image"><img src="/zeychat.png" /></span>
                    <MenuOpenedSvg />
                </div>
                <hr />
                <div className={`item ${[undefined, '', 'home'].includes(segment2) ? 'active' : ''}`} onClick={() => navigate(`/super-admin`)}><HomeSvg />home</div>
                <div className={`item ${segment2 === 'partners' ? 'active' : ''}`} onClick={() => navigate(`/super-admin/partners`)}><PartnersSvg />partners</div>
                <div className={`item ${segment2 === 'user-admins' ? 'active' : ''}`} onClick={() => navigate(`/super-admin/user-admins`)}><AdminsSvg />admins</div>
            </div>
            <div className="container">
                <div className="header">
                    <span className="page-name">{PAGES_NAMES[segment2 || '']}</span>
                    <span className="button-1" onClick={() => {
                        logOut();
                        dispatch(setUserSuper({}));
                        navigate('/super-admin/login')
                    }}>logout<LogOutSvg /></span>
                </div>
                <div className="body">
                    <Outlet />
                </div>
            </div>
        </div>
    )
};

export default UserSuper;