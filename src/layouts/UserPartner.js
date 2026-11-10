import {useRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useNavigate, useLocation} from "react-router-dom";
import {PAGES_NAMES} from "../Constants";
import {VisitorsSvg, HistorySvg, HomeSvg, LogOutSvg, MenuOpenedSvg} from "../Icons";
import {auth} from "../controllers/user-partner/UserPartner";
import {setUserPartner, deleteUserPartner} from "../reducers/user-partner/userPartnerSlice";
import {setAgent} from "../reducers/user-partner/agentsSlice";
import {setProfile, deleteProfile} from "../reducers/user-partner/profileSlice";
import {setPopUp} from "../reducers/popUpSlice";

import PopUp from "../components/PopUp";
import WindowNotifications from "../components/user-partner/WindowNotifications";
import KeyboardController from "../controllers/user-partner/KeyboardController";
import ChatRequests from "../components/user-partner/ChatRequests";
import TransferRequests from "../components/user-partner/TransferRequests";
import ChatPopUp from "../components/user-partner/chatPopUp/ChatPopUp";
import SocketController from "../controllers/user-partner/SocketController";
import Chats from "../components/user-partner/Chats";
import Status from "../components/user-partner/Status";
import TeamMenu from "../components/user-partner/TeamMenu";
import ChatsViews from "../components/user-partner/ChatsViews";
import ChatEnd from "../components/user-partner/chatPopUp/ChatEnd";
import Ban from "../components/user-partner/chatPopUp/Ban";
import ProfileImage from "../components/user-partner/ProfileImage";
import SettingsMenu from "../components/user-partner/SettingsMenu";
import Transfer from "../components/user-partner/Transfer";

import Team from "../pages/user-partner/Team";
import HotKeys from "../pages/user-partner/HotKeys";
import AgentsCreate from "../pages/user-partner/agents/Create";
import AdminsAgentsUpdate from "../pages/user-partner/agents/Update/Admins";
import TeamLeadsAgentsUpdate from "../pages/user-partner/agents/Update/TeamLeads";
import AgentsDelete from "../pages/user-partner/agents/Delete";
import ShortcutsCreate from "../pages/user-partner/shortcuts/Create";
import ShortcutsUpdate from "../pages/user-partner/shortcuts/Update";
import ShortcutsDelete from "../pages/user-partner/shortcuts/Delete";
import ProfileUpdateInfo from "../pages/user-partner/profile/Update/Info";
import WidgetsCreate from "../pages/user-partner/widgets/Create";
import WidgetsDelete from "../pages/user-partner/widgets/Delete";
import HistoryDeleteFile from "../pages/user-partner/history/Delete/File";

import {logOut} from "../controllers/user-partner/UserPartner";

const UserPartner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const chatRequestsRef = useRef(null);
    const buttonLogoutRef = useRef(null);
    const [load, setLoad] = useState(true);
    const [, segment1, segment2] = pathname.split('/');
    const {partnerId, userPartnerId, role, partnerName, config} = useSelector(state => state.userPartner);

    const menus = {
        'home': <div key="home" className={`item ${[undefined, '', 'home'].includes(segment2) ? 'active' : ''}`} onClick={() => navigate(`/${segment1}`)}><HomeSvg />home</div>,
        'visitors': <div key="visitors" className={`item ${segment2 === 'visitors' ? 'active' : ''}`} onClick={() => navigate(`/${segment1}/visitors`)}><VisitorsSvg />visitors</div>,
        'history': <div key="history" className={`item ${segment2 === 'history' ? 'active' : ''}`} onClick={() => navigate(`/${segment1}/history`)}><HistorySvg />history</div>,
        'agents': <div key="agents" className={`item ${segment2 === 'agents' ? 'active' : ''}`} onClick={() => navigate(`/${segment1}/agents`)}>agents</div>,
        'shortcuts': <div key="shortcuts" className={`item ${segment2 === 'shortcuts' ? 'active' : ''}`} onClick={() => navigate(`/${segment1}/shortcuts`)}>shortcuts</div>,
        'visitors-banned': <div key="visitors-banned" className={`item ${segment2 === 'visitors-banned' ? 'active' : ''}`} onClick={() => navigate(`/${segment1}/visitors-banned`)}>banned</div>,
        'widgets': <div key="widgets" className={`item ${segment2 === 'widgets' ? 'active' : ''}`} onClick={() => navigate(`/${segment1}/widgets`)}>widgets</div>,
        'profile': <div key="profile" className={`item ${segment2 === 'profile' ? 'active' : ''}`} onClick={() => navigate(`/${segment1}/profile`)}>personal</div>
    };

    const popUps = {
        'team': <Team />,
        'ban': <Ban />,
        'hot-keys': <HotKeys />,
        'chats/end': <ChatEnd />,
        'histories/delete/file': <HistoryDeleteFile />,
        'transfer': <Transfer />,
        'agents/create': <AgentsCreate />,
        'team-leads/agents/update': <TeamLeadsAgentsUpdate />,
        'admins/agents/update': <AdminsAgentsUpdate />,
        'agents/delete': <AgentsDelete />,
        'shortcuts/create': <ShortcutsCreate />,
        'shortcuts/update': <ShortcutsUpdate />,
        'shortcuts/delete': <ShortcutsDelete />,
        'profile/update/info': <ProfileUpdateInfo />,
        'widgets/create': <WidgetsCreate />,
        'widgets/delete': <WidgetsDelete />,
    };

    useEffect(() => {
        (async () => {
            const payload = await auth(segment1);
            if(!payload) return navigate('/');

            dispatch(setUserPartner(payload));
            dispatch(setProfile(payload));

            setLoad(false);
        })();
    }, []);

    if(segment2 && config.routes && !config.routes.includes(segment2)) return navigate(`/${segment1}/page-not-found`);

    if (!load) return (
        <div className="user-partner">
            <SocketController config={{partnerId, userPartnerId, role}} buttonLogoutRef={buttonLogoutRef} />
            <ChatPopUp />
            <WindowNotifications />
            <PopUp routes={config.popUpRoutes.reduce((a, n) => {a[n] = popUps[n]; return a}, {})} />
            <div className="left-menu">
                <div className="header">
                    <Status statusFlag={config.status}/>
                    <span>{partnerName}</span>
                    <MenuOpenedSvg />
                </div>
                {config.chatRequests && <ChatRequests chatRequestsRef={chatRequestsRef}/>}
                {config.transferRequests && <TransferRequests />}
                <hr />
                {config.leftMenu.menu.map(name => menus[name])}
                <SettingsMenu menus={config.leftMenu.settingsMenu.map(name => menus[name])} />
                <TeamMenu />
            </div>
            <div className="container">
                <div className="header">
                    <span className="page-name">{PAGES_NAMES[segment2 || '']}</span>
                    {config.hotKeys && <>
                        <KeyboardController chatRequestsRef={chatRequestsRef}/>
                        <span className="button-1" onClick={() => dispatch(setPopUp(['hot-keys']))}>hot keys</span>
                    </>}
                    <span ref={buttonLogoutRef} className="button-1" onClick={() => {
                        setLoad(true);

                        dispatch(deleteUserPartner());
                        logOut(segment1);

                        navigate('/');

                        dispatch(deleteProfile());
                    }}>logout<LogOutSvg /></span>
                    <span className="circle-image" onClick={() => navigate(`/${segment1}/profile`)}>
                        <ProfileImage />
                    </span>
                </div>
                <div className="body">
                    <Outlet />
                </div>
                <div className="footer">
                    {config.views && <ChatsViews />}
                    {config.chats && <Chats />}
                </div>
            </div>
        </div>
    )
};

export default UserPartner;