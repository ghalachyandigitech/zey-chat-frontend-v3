import Input from "../../../../components/Input";
import Select from "../../../../components/Select";

const TeamLeads = ({state, error}) => {
    return (
        <>
            <div className="input-group">
                <Input name="name" value={state.name[0]} setValue={v => state.name[1](v)} error={error.name} />
                <Select name="chat limit" value={state.limit[0]} onChange={v => state.limit[1](v*1)} options={[
                    ['1', '1'], ['2', '2'], ['3', '3'],
                    ['4', '4'], ['5', '5'], ['6', '6'],
                    ['7', '7'], ['8', '8'], ['9', '9'],
                    ['10', '10']
                ]} />
            </div>
        </>
    )
};

export default TeamLeads;