import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DeleteSvg, EditSvg, LoadingGif} from "../../../Icons";
import {setPopUp} from "../../../reducers/popUpSlice";
import {getPartners, updateStatus} from "../../../controllers/user-super/PartnersController";
import {getUserAdmins} from "../../../controllers/user-super/UserAdminsController";
import {setPartners, updateStatusById} from "../../../reducers/user-super/partnersSlice";
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice";
import Checkbox from "../../../components/CheckBox";

const Read = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(true);
    const [userAdmins, setUserAdmins] = useState([]);
    const partners = useSelector(state => state.partners.list);

    useEffect(() => {
        (async () => {
            const [
                [partnersError, {partners}],
                [userAdminsError, {userAdmins}]
            ] = await Promise.all([
                getPartners(),
                getUserAdmins()
            ]);

            setLoad(false);

            if(Object.keys(partnersError).length || Object.keys(userAdminsError).length) return; //todo error@ brnel datark userPartner null

            setUserAdmins(userAdmins.reduce((e, i) => {e[i._id] = i.name; return e}, {})); //todo karelia tanel reducer
            dispatch(setPartners(partners));
        })()
    }, []);

    return (
        <>
            <div className="input-group">
                <button className="button" onClick={() => {dispatch(setPopUp(['partners/create', {userAdmins}]))}}>new</button>
            </div>
            <div className="table">
                <table>
                    <thead><tr><th>name</th><th>admins</th><th>actions</th></tr></thead>
                    <tbody>
                        {partners.map(partner => <tr>
                            <td>{partner.name}</td>
                            <td>{partner.userAdminsIds.map(_id => userAdmins[_id]).join(', ')}</td>
                            <td>
                                <div className="actions">
                                    <Checkbox checked={partner.status} onChange={async () => {
                                        // setLoad(true);

                                        const [error, payload] = await updateStatus({_id: partner._id, status: 1-partner.status});

                                        // setLoad(false);

                                        if(Object.keys(error).length) return setFlashPopUp('error');

                                        dispatch(updateStatusById(payload));
                                        dispatch(setFlashPopUp('status updated'));
                                        dispatch(setPopUp(0))
                                    }} />
                                    <EditSvg onButtonClick={() => dispatch(setPopUp(['partners/update', {partner, userAdmins}]))}/>
                                    <DeleteSvg onButtonClick={() =>
                                        dispatch(setPopUp(['partners/delete', {_id: partner._id, name: partner.name}, 'warning']))}/>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                {(load && <LoadingGif />) || (!partners.length && <div>result not found</div>)}
            </div>
        </>
    )
};

export default Read;