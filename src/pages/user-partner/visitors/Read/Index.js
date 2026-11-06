import {visitorsTypes} from "../../../../Constants";
import {useDispatch} from "react-redux";
import VisitorsType from "./VisitorsType";
import {updateVisitorsTimer} from "../../../../reducers/user-partner/visitorsSlice";
import {useState, useEffect} from "react";
import InputSearch from "../../../../components/InputSearch";

const Index = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => dispatch(updateVisitorsTimer()), 60*5*1000);

        return () => clearInterval(intervalId);
    }, []);

    return(
        <>
            <div className="input-group">
                <InputSearch name="filter" value={filter} setValue={setFilter} />
            </div>
            <div className="visitors-view">
                {visitorsTypes.map(([type, name]) => (
                    <VisitorsType type={type} name={name} viewChat={type === 'served'} filter={filter}
                        online={['incoming', 'assigned', 'served'].includes(type)} />
                ))}
            </div>
        </>
    )
};

export default Index;