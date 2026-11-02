import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setProfileImage} from "../../../../reducers/user-partner/profileSlice";
import {updateProfileImage, deleteProfileImage} from "../../../../controllers/user-partner/ProfileController";
import {setFlashPopUp} from "../../../../reducers/flashPopUpSlice";
import FileUpload from "../../../../components/FileUpload";
import {LoadingGif} from "../../../../Icons";

const ProfileImage = () => {
    const dispatch = useDispatch();
    let profileImage = useSelector(state => state.profile.profileImage);
    profileImage = [profileImage.split('.').reverse()[0], profileImage];
    const [load, setLoad] = useState(false);
    const [error, setError] = useState({});

    return (
        <>
            {error.server && <div className="error">{error.server}</div>}
            {(load && <LoadingGif />) ||
                <FileUpload name="profile image" error={error.profileImage} value={profileImage}
                    onUpload={async (value) => {
                        setLoad(true);

                        const [error, {profileImage}] = await updateProfileImage(value);

                        setLoad(false);

                        if(Object.keys(error).length) return setError(error);

                        dispatch(setProfileImage(profileImage));
                        dispatch(setFlashPopUp('profile image updated'));
                    }}
                    onClose={async () => {
                        if(profileImage){
                            setLoad(true);

                            const [error] = await deleteProfileImage();

                            setLoad(false);

                            if(Object.keys(error).length) return setError(error);

                            dispatch(setProfileImage(''));
                            dispatch(setFlashPopUp('profile image deleted'));
                        }
                    }}
                />
            }
        </>
    )
};

export default ProfileImage;