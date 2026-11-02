import Input from "../../../components/Input";
import Select from 'react-select'
import {useRef} from "react";

const Form = ({state, error}) => {
    const fileManualSelectRef = useRef(false);

    return (
        <div className="input-groups-column">
            <Input name="name" value={state.name[0]} setValue={state.name[1]} error={error.name} className="div" />
            <Select isMulti isClearable={false} options={state.userAdminsOptions} defaultValue={state.userAdminsDefaultValues}
                onChange={selected => state.userAdminsIds[1](selected.map(option => option.value))}
                placeholder="admins" styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: '#0f3d56',
                        boxShadow: state.isFocused ? '0 0 0px 1px #0f3d56' : 'none',
                        '&:hover': {borderColor: '#0f3d56'},
                    })
                }}
            />
            <div className="attach-file">
                <span>attach file</span>
                <div>
                    <label className="input-radio">
                        <input type="radio" name="file" value="0" checked={state.file[0] === 0} onChange={e => state.file[1](e.target.value*1)}/>
                        disable
                    </label>
                    <label className="input-radio">
                        <input type="radio" name="file" value="1" checked={state.file[0] === 1} onChange={e => state.file[1](e.target.value*1)}/>
                        enable
                    </label>
                    <label className="input-radio">
                        <input type="radio" name="file" checked={[2,3].includes(state.file[0])} onChange={() => state.file[1](fileManualSelectRef.current.value*1)}/>
                        manual
                    </label>
                    <div className="select input-default">
                        <select ref={fileManualSelectRef} value={state.file[0]} disabled={[0,1].includes(state.file[0])}
                                onChange={e => state.file[1](e.target.value*1)}>
                            <option value="2">disabled</option>
                            <option value="3">enabled</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Form;