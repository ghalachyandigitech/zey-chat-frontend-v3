import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getVisitorsBanned, setBan} from "../../controllers/user-partner/UserPartner";
import {setVisitorsBanned} from "../../reducers/user-partner/visitorsBannedSlice";
import {LoadingGif} from "../../Icons";
import InputSearch from "../../components/InputSearch";

//todo backendum visitori mej created key ka bayc vonc vor chi ogtagorcvum
const VisitorsBanned = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const [filter, setFilter] = useState('');
    const visitors = useSelector(state => state.visitorsBanned.list.filter(visitor => visitor.name.indexOf(filter) !== -1));

    useEffect(() => {
        (async () => {//todo amen angam visitori infon request a anum karoxa petq a cache pahel
            setLoad(true);

            const [error, {visitors}] = await getVisitorsBanned();//todo error@ brnel datark userPartner null

            setLoad(false);

            if(Object.keys(error).length) return;

            dispatch(setVisitorsBanned(visitors));
        })()
    }, []);

    return(
        <>
            <div className="input-group">
                <InputSearch name='filter' value={filter} setValue={setFilter} />
            </div>
            <div className="table">
                <table>
                    <thead>
                    <tr>
                        <th>visitor</th>
                        <th>reason</th>
                        <th>date created</th>
                        <th>actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!load && visitors.map(visitor => <tr>
                        <td>{visitor.name}</td>
                        <td>{visitor.banReason}</td>
                        <td>{visitor.updatedAt}</td>
                        <td>
                            <div className="actions">
                                <button className="button" onClick={() => setBan(visitor._id, 0)}>unban</button>
                            </div>
                        </td>
                    </tr>)}
                    </tbody>
                </table>
                {(load && <LoadingGif />) || (!visitors.length && <div>result not found</div>)}
            </div>
        </>
    )
};

export default VisitorsBanned;