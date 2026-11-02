import {deleteUserAdminById} from "../../../controllers/user-super/UserAdminsController";
import {useState} from "react";
import {deleteUserAdmin} from "../../../reducers/user-super/userAdminsSlice"
import {setPopUp} from "../../../reducers/popUpSlice"
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice"
import {useDispatch, useSelector} from "react-redux";

const Delete = () => {
    const dispatch = useDispatch();
    const {_id, name} = useSelector(state => state.popUp.payload);
    const [load, setLoad] = useState(false);

    return (
        <>
            <div>Are you sure you want to delete user admin "{name}"?</div>
            <div className="input-group">
                <button className="button" onClick={() => dispatch(setPopUp(0))}>cancel</button>
                <button className="button" onClick={async () => {
                    if(load) return;
                    setLoad(true);

                    const [error] = await deleteUserAdminById({_id: _id});

                    setLoad(false);

                    if(Object.keys(error).length) return dispatch(setFlashPopUp('server error'));

                    dispatch(deleteUserAdmin(_id));
                    dispatch(setPopUp(0));
                    dispatch(setFlashPopUp('user admin deleted'));
                }}>delete</button>
            </div>
        </>
    )
};


export default Delete;