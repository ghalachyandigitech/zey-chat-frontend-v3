import './css/ffff.css'
import './css/home.css'
// import './css/User.css'
import './css/user-partner/common.css'
import './css/user-partner/profile.css'
import './css/user-partner/transcript.css'
import './css/user/user-guest.css'
import './css/user/home.css'
import './css/flags.css'
// import './css/user-super/user-super.css'
import './css/user-partner.css'
import './css/left-menu.css'
import './css/pop-up.css'
import './css/pop-up-flash.css'
import './css/user-partner/chats.css'

import {BrowserRouter, Routes, Route} from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import FlashPopUp from "./components/FlashPopUp";
import User from "./layouts/User";
import UserGuest from "./layouts/UserGuest";
import UserPartner from "./layouts/UserPartner";
import UserSignIn from "./layouts/UserSignIn";
import UserSuper from "./layouts/UserSuper";
import UserSuperGuest from "./layouts/UserSuperGuest";
import UserSuperSignIn from "./layouts/UserSuperSignIn";

//user-super
import UserSuperUserAdminsRead from "./pages/user-super/userAdmins/Read";
import UserSuperPartnersRead from "./pages/user-super/partners/Read";
import UserSuperHome from "./pages/user-super/Home";
import UserSuperLogin from "./pages/user-super/Login";
//user
import CreatePassword from "./pages/user/CreatePassword";
import ForgotPassword from "./pages/user/ForgotPassword";
import UserHome from "./pages/user/Home";
import UserLogin from "./pages/user/Login";
//user-partners
import VisitorsBanned from "./pages/user-partner/VisitorsBanned";
import Visitors from "./pages/user-partner/visitors/Read/Index";
import Agents from "./pages/user-partner/agents/Read";
import Widgets from "./pages/user-partner/widgets/Read/Index";
import Profile from "./pages/user-partner/profile/Read/Read";
import Histories from "./pages/user-partner/history/Read/Index";
import Shortcuts from "./pages/user-partner/shortcuts/Read";

function App() {
    return (
        <BrowserRouter>
            <FlashPopUp />
            <Routes>
                <Route path="/" element={<UserSignIn />}>
                    <Route element={<User />}>
                        <Route index element={<UserHome />}/>
                    </Route>
                    <Route element={<UserGuest />}>
                        <Route path="forgot-password" element={<ForgotPassword />}/>
                        <Route path="create-password/:token" element={<CreatePassword />}/>
                        <Route path="login" element={<UserLogin />}/>
                    </Route>
                </Route>
                <Route path="/super-admin" element={<UserSuperSignIn />}>
                    <Route element={<UserSuperGuest />}>
                        <Route path="login" element={<UserSuperLogin />}/>
                    </Route>
                    <Route element={<UserSuper />}>
                        <Route index element={<UserSuperHome />}/>
                        <Route path="partners" element={<UserSuperPartnersRead />}/>
                        <Route path="user-admins" element={<UserSuperUserAdminsRead />}/>
                        <Route path="*" element={<PageNotFound />}/>
                    </Route>
                </Route>
                <Route path=":partnerId" element={<UserPartner />}>
                    <Route index element={<></>}/>
                    <Route path="history" element={<Histories />}/>
                    <Route path="profile" element={<Profile />}/>
                    <Route path="agents" element={<Agents />}/>
                    <Route path="visitors-banned" element={<VisitorsBanned />}/>
                    <Route path="visitors" element={<Visitors />}/>
                    <Route path="widgets" element={<Widgets />}/>
                    <Route path="shortcuts" element={<Shortcuts />}/>
                    <Route path="*" element={<PageNotFound />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;