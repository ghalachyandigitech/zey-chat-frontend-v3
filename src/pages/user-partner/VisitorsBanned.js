import {useState} from "react";
import {useSelector} from "react-redux";
import {setBan} from "../../controllers/user-partner/UserPartner";
import InputSearch from "../../components/InputSearch";

const VisitorsBanned = () => {
    const [filter, setFilter] = useState('');
    let visitors = useSelector(state => state.visitorsBanned.list);
    visitors = visitors.filter(visitor => visitor.name.indexOf(filter) !== -1);

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
                    {visitors.map(visitor => <tr key={visitor._id}>
                        <td>{visitor.name}</td>
                        <td>{visitor.banReason}</td>
                        <td>{visitor.banUpdatedAt}</td>
                        <td>
                            <div className="actions">
                                <button className="button" onClick={() => setBan(visitor._id, 0)}>unban</button>
                            </div>
                        </td>
                    </tr>)}
                    </tbody>
                </table>
                {!visitors.length && <div>result not found</div>}
            </div>
        </>
    )
};

export default VisitorsBanned;