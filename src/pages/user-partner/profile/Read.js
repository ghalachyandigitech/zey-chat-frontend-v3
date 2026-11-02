import {useState} from "react";
import Info from "./Info";
import Notifications from "./Update/Notifications";
import Tabs from "../../../components/Tabs";
import {useSelector} from "react-redux";

const Read = () => {
    const [page, setPage] = useState(0);
    const {profileNotifications, profileUpdate, profileDashboardImage} = useSelector((state) => state.userPartner.config);

    const options = [[0, 'profile']];
    const tabs = [<Info profileUpdate={profileUpdate} profileDashboardImage={profileDashboardImage}/>];
    if(profileNotifications){
        options.push([1, 'notifications']);
        tabs.push(<Notifications />);
    }

    return(
        <>
            <Tabs page={page} setPage={setPage} tabs={options} />
            {tabs[page]}
        </>
    )
};

export default Read;