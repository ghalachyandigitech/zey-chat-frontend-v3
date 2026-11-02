import {deletePartnerById} from "../../../controllers/user-super/PartnersController";
import {useState} from "react";
import {deletePartner} from "../../../reducers/user-super/partnersSlice"
import {setPopUp} from "../../../reducers/popUpSlice"
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice"
import {useDispatch, useSelector} from "react-redux";

const Delete = () => {
    const dispatch = useDispatch();
    const {name, _id} = useSelector(state => state.popUp.payload);
    const [load, setLoad] = useState(false);

    return (
        <>
            <div>are you sure you want to delete partner "{name}"?</div>
            <div className="input-group">
                <button className="button" onClick={() => dispatch(setPopUp(0))}>cancel</button>
                <button className="button" onClick={async () => {
                    if(load) return;
                    setLoad(true);

                    const [error] = await deletePartnerById({_id: _id});

                    setLoad(false);

                    if(Object.keys(error).length) return dispatch(setFlashPopUp('server error'));

                    dispatch(deletePartner(_id));
                    dispatch(setPopUp(0));
                    dispatch(setFlashPopUp('partner deleted'));
                }}>delete</button>
            </div>
        </>
    )
};


export default Delete;