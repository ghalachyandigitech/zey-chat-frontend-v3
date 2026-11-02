import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";

const Form = ({state, error}) => {
    return (
        <>
            <div className="input-groups-column">
                <Input name="tag" value={state.tag[0]} setValue={state.tag[1]} error={error.tag} />
                <Textarea name="message" value={state.message[0]} setValue={state.message[1]} error={error.message} />
            </div>
        </>
    )
};

export default Form;