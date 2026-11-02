import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DeleteSvg, EditSvg, LoadingGif, RefreshSvg} from "../../../Icons";
import {setPopUp} from "../../../reducers/popUpSlice";
import {getUserAdmins, resetPasswordUserAdmin} from "../../../controllers/user-super/UserAdminsController";
import {setUserAdmins} from "../../../reducers/user-super/userAdminsSlice";
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice";

const Read = () => {
    const dispatch = useDispatch();
    const userAdmins = useSelector(state => state.userAdmins.list);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        (async () => {
            const [error, {userAdmins}] = await getUserAdmins();

            if(Object.keys(error).length) return;

            dispatch(setUserAdmins(userAdmins));

            setLoad(false);
        })()
    }, []);

    return (
        <>
            <div className="input-group">
                <button className="button" onClick={() => {dispatch(setPopUp(['user-admins/create']))}}>new</button>
            </div>
            <div className="table">
                <table>
                    <thead><tr><th>name</th><th>email</th><th>company</th><th>phone</th><th>actions</th></tr></thead>
                    <tbody>
                        {userAdmins.map(user =>
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.companyName}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <div className="actions">
                                        <RefreshSvg onButtonClick={async () => {
                                            const [error] = await resetPasswordUserAdmin({_id: user._id});

                                            if(Object.keys(error).length) return;

                                            dispatch(setFlashPopUp('password reset email sent'));
                                        }}/>
                                        <EditSvg onButtonClick={async () => dispatch(setPopUp(['user-admins/update', user]))} />
                                        <DeleteSvg onButtonClick={async () =>
                                            dispatch(setPopUp(['user-admins/delete', {_id: user._id, name: user.name}, 'warning']))
                                        } />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {(load && <LoadingGif />) || (!userAdmins.length && <div>result not found</div>)}
            </div>
        </>
    )
};

export default Read;