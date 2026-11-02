import {useEffect, useState} from 'react';
import Select from 'react-select';
import {getUserPartners, userPartnerLogin, logOut} from "../../controllers/user/User";
import {deleteUser} from "../../reducers/user/userSlice";
import {useNavigate} from "react-router-dom";

import {UserImage, LoginImage} from "../../Icons";
import {USER_PARTNERS_STATUSES} from "../../Constants";
import {useSelector, useDispatch} from "react-redux";

const Home = () => {
    const [load, setLoad] = useState(true);
    const [userPartners, setUserPartners] = useState([]);
    const [partners, setPartners] = useState([]);
    const {email} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const [error, payload] = await getUserPartners();

            if(Object.keys(error).length) return;

            setPartners(payload.partners); //todo ete null ga
            setUserPartners(payload.userPartners); //todo ete null ga
        })();
    }, []);

    const options = [];
    Object.entries(USER_PARTNERS_STATUSES).forEach(([status, name]) => {
         if(status > 1) options.push({value: status, label: name})
    });
    const color = {2: '#808080', 3: '#d56300', 4: '#009436'};
    const dot = (index) => ({
        alignItems: 'center',
        display: 'flex',
        ':before': {
            backgroundColor: color[index],
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: '8px',
            height: 10,
            width: 10,
        },
    });

    return (
        <div className="home">
            <div className="user-image"><UserImage /></div>
            {email}
            <h1>dashboards</h1>
            <div className="user-partners">
                {Object.entries(userPartners).map(([_id, userPartner]) =>
                    <div>
                        {userPartner.role > 1 && <Select isClearable={false} isSearchable={false}
                            options={options}
                            value={{value: userPartner.loginStatus}}
                            onChange={option => setUserPartners({...userPartners, [_id]: {...userPartner, loginStatus: option.value}})}
                            styles={{
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    border: 'none',
                                    borderColor: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {borderColor: 'none', backgroundColor: 'rgba(180,180,180,.2)'},
                                }),
                                container: (provided) => ({...provided, width: '80px', display: 'inline-block'}),
                                option: (styles, {data, isDisabled, isFocused, isSelected}) => {
                                    return {
                                        ...styles,
                                        backgroundColor: isSelected ? undefined : isFocused ? 'rgba(180,180,180,.2)' : undefined,
                                        color: color[data.value],
                                        ':active': {...styles[':active'], backgroundColor: undefined},
                                    };
                                },
                                singleValue: (styles, {data}) => ({...styles, ...dot(data.value)}),
                            }}
                        />}
                        <span className="login" onClick={async () => {
                            const key = partners[userPartner.partnerId].key;
                            if(await userPartnerLogin({key: key, status: userPartner.loginStatus*1})){
                                window.open('', '_blank').location.href = key;
                            }
                        }}>{partners[userPartner.partnerId].name}<LoginImage /></span>
                    </div>
                )}
            </div>
            <div className="input-group">
                <button className="button" onClick={() => {
                    dispatch(deleteUser());
                    logOut();
                    navigate('login');
                }}>logout</button>
            </div>
        </div>
    )
};

export default Home;