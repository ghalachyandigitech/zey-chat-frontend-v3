import {useSelector} from "react-redux";

const ProfileImage = () => {
    const {name, profileImage} = useSelector(state => state.profile);

    return (
        <>
            {profileImage ? <img src={profileImage} /> : name.slice(0,1)}
        </>
    )
};

export default ProfileImage;