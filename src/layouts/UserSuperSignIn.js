import {useDispatch} from 'react-redux';
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {auth} from "../controllers/user-super/UserSuperController";
import {setUserSuper} from "../reducers/user-super/userSuperSlice";

const UserSuperSignIn = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(true);

    useEffect(() => {
        (async () => {
            const user = await auth();
            if(user) dispatch(setUserSuper(user));

            setLoad(false);
        })();
    }, []);

    if(!load) return (<><Outlet /></>);
};

export default UserSuperSignIn;