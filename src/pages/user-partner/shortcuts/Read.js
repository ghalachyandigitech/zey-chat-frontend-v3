import {setPopUp} from "../../../reducers/popUpSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {get} from "../../../controllers/user-partner/ShortcutsController";
import {setShortcuts} from "../../../reducers/user-partner/shortcutSlice";
import InputSearch from "../../../components/InputSearch";
import {DeleteSvg, EditSvg, LoadingGif} from "../../../Icons";

const Read = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('');
    const [load, setLoad] = useState(true);
    const list = useSelector(state => state.shortcuts.list);
    const shortcuts = list.filter(s => s.message.indexOf(filter) !== -1 || s.tag.indexOf(filter) !== -1);

    useEffect(() => {
        (async () => {
            const [error, payload] = await get();

            if(Object.keys(error).length) return;

            dispatch(setShortcuts(payload));

            setLoad(false);
        })()
    }, []);

    return (
        <>
            <div className="input-group">
                <button className="button" onClick={() => {dispatch(setPopUp(['shortcuts/create', {}]))}}>New</button>
                <InputSearch name='filter' value={filter} setValue={setFilter} />
            </div>
            <div className="table">
                <table>
                    <thead><tr><th>tag</th><th>message</th><th>actions</th></tr></thead>
                    <tbody>
                    {!load && shortcuts.map(shortcut =>
                        <tr>
                            <td>{shortcut.tag}</td>
                            <td>{shortcut.message}</td>
                            <td>
                                <div className="actions">
                                    <EditSvg onButtonClick={() => dispatch(setPopUp(['shortcuts/update', shortcut]))}/>
                                    <DeleteSvg onButtonClick={() =>
                                        dispatch(setPopUp(['shortcuts/delete', {_id: shortcut._id, tag: shortcut.tag}, 'warning']))
                                    }/>
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                {(load && <LoadingGif />) || (!shortcuts.length && <div>result not found</div>)}
            </div>
        </>
    )
};

export default Read;