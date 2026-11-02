import {useDispatch} from 'react-redux';
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {auth} from "../controllers/user/User";
import {setUser} from "../reducers/user/userSlice";

const UserSignIn = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(true);

    useEffect(() => {
        (async () => {
            const user = await auth();
            if(user) dispatch(setUser(user));

            setLoad(false);
        })();
    }, []);

    if(!load) return (<><Outlet /></>)
};

export default UserSignIn;