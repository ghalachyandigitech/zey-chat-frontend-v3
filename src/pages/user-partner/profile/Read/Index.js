import {useDispatch, useSelector} from "react-redux";
import {setPopUp} from "../../../../reducers/popUpSlice";
import {NameSvg, EmailSvg, HashSvg} from "../../../../Icons";
import ProfileImageUpdate from "../Update/ProfileImage";
import DashboardImageUpdate from "../Update/DashboardImage";

const Index = ({profileUpdate, profileDashboardImage}) => {
    const dispatch = useDispatch();
    const {name, userEmail} = useSelector(state => state.profile);

    return (
        <div className="info">
            <h2>profile</h2>
            <ProfileImageUpdate />
            <div className="fields">
                <div><NameSvg />{name}</div>
                <div><EmailSvg />{userEmail}</div>
                <div><HashSvg />tagline</div>
            </div>
            {profileDashboardImage && <DashboardImageUpdate />}
            {profileUpdate && <button className="button" onClick={() => dispatch(setPopUp(['profile/update/info']))}>edit</button>}
        </div>
    )
};

export default Index;