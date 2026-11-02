import {updateStatus} from "../../controllers/user-partner/UserPartner";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {USER_PARTNERS_STATUSES} from "../../Constants";
import {setFlashPopUp} from "../../reducers/flashPopUpSlice";

const Status = ({statusFlag}) => {
    const dispatch = useDispatch();
    const [statusList, setStatusList] = useState(false);
    const {status, dashboardImage} = useSelector(state => state.profile);

    return (
        <div onClick={() => setStatusList(!statusList)}>
            {statusFlag && <span className={"status status-" + USER_PARTNERS_STATUSES[status]}> </span>}
            <span className="circle-image">
                <img src={dashboardImage ? dashboardImage: '/zeychat.png'} />
            </span>
            {statusFlag && statusList && <div className="status-list">
                {Object.entries(USER_PARTNERS_STATUSES).map(([index, value]) =>
                    <div key={index} onClick={() => {
                        updateStatus(index);
                        dispatch(setFlashPopUp('status update'));
                        setStatusList(false);
                    }}>
                        <span className={"status " + "status-" + value}> </span>
                        <span>{value}</span>
                    </div>
                )}
            </div>}
        </div>
    )
};

export default Status;