import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateDashboardImage, deleteDashboardImage} from "../../../../controllers/user-partner/ProfileController";
import {LoadingGif} from "../../../../Icons";
import {setFlashPopUp} from "../../../../reducers/flashPopUpSlice";
import FileUpload from "../../../../components/FileUpload";
import {setDashboardImage} from "../../../../reducers/user-partner/profileSlice";

const DashboardImage = () => {
    const dispatch = useDispatch();
    let dashboardImage = useSelector((state) => state.profile.dashboardImage);
    dashboardImage = [dashboardImage.split('.').reverse()[0], dashboardImage];
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});

    return (
        <>
            {error.server && <div className="error">{error.server}</div>}
            {(load && <LoadingGif />) ||
                <FileUpload name="dashboard image" error={error.dashboardImage} value={dashboardImage}
                    onUpload={async (value) => {
                        setLoad(true);

                        const [error, payload] = await updateDashboardImage(value);

                        setLoad(false);

                        if(Object.keys(error).length) return setError(error);

                        dispatch(setDashboardImage(payload));
                        dispatch(setFlashPopUp('dashboard image updated'));
                    }}
                    onClose={async () => {
                        if(dashboardImage){
                            setLoad(true);

                            const [error] = await deleteDashboardImage();

                            setLoad(false);

                            if(Object.keys(error).length) return setError(error);

                            dispatch(setDashboardImage(''));
                            dispatch(setFlashPopUp('dashboard image deleted'));
                        }
                    }}
                />
            }
        </>
    )
};

export default DashboardImage;