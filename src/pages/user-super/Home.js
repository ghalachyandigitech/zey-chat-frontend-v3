import {useEffect, useState} from "react";
import {home} from "../../controllers/user-super/UserSuperController";
import {DashboardPartnersSvg, DashboardUsersSvg, DashboardChatsSvg, LoadingGif} from "../../Icons";

const Home = () => {
    const [counts, setCounts] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        (async () => {
            const [error, {counts}] = await home();

            if(Object.keys(error).length) return;

            setCounts(counts);

            setLoad(false);
        })()
    }, []);

    return(
        <>
            <h3>super admin home</h3>
            {load ? <LoadingGif /> : <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <DashboardPartnersSvg />{counts[0]}
                <DashboardUsersSvg />{counts[1]}
                <DashboardChatsSvg />{counts[2]}
            </div>}
        </>
    )
};

export default Home;