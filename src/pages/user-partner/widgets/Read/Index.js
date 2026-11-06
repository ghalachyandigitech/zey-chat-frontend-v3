import {useState, useEffect} from "react";
import {setPopUp} from "../../../../reducers/popUpSlice";
import {useDispatch, useSelector} from "react-redux";
import {get} from "../../../../controllers/user-partner/WidgetsController";
import GettingStarted from "./GettingStarted";
import Appearance from "../Update/Appearance";
import Forms from "../Update/Forms";
import Settings from "../Update/Settings";
import {setWidgets, setSelected} from "../../../../reducers/user-partner/widgetsSlice";
import Tabs from "../../../../components/Tabs";
import Select from "../../../../components/Select";

const Index = () => {
    const {list, selected} = useSelector(state => state.widgets);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState({});

    useEffect(() => {
        (async () => {
            const [error, payload] = await get();

            if(Object.keys(error).length) setError(error);

            setLoad(false);

            dispatch(setWidgets(payload));
        })()
    }, []);

    if(!load) return(
        <>
            {error.server}
            <div className="input-group">
                <Select options={list.map(({_id, name}) => [_id, name])} value={selected._id} onChange={v => dispatch(setSelected(v))} />
                <button className="button" onClick={() => dispatch(setPopUp(['widgets/create']))}>new</button>
                {selected._id && <button className="button" onClick={() =>
                    dispatch(setPopUp(['widgets/delete', {_id: selected._id, name: selected.name}, 'warning']))
                }>delete</button>}
            </div>
            {selected._id && <>
                <Tabs page={page} setPage={setPage} tabs={[
                    [0, 'getting started'],
                    [1, 'appearance'],
                    [2, 'forms'],
                    [3, 'settings'],
                ]} />
                <div className="widget-body">{[
                    <GettingStarted />,
                    <Appearance />,
                    <Forms />,
                    <Settings />
                ][page]}</div>
            </>}
        </>
    )
};

export default Index;