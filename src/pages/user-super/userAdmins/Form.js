import Input from "../../../components/Input";

const Form = ({state, error}) => {
    return (
        <>
            <div className="input-group">
                <Input name="name" value={state.name[0]} setValue={state.name[1]} error={error.name} />
                <Input name="company name" value={state.companyName[0]} setValue={state.companyName[1]} error={error.companyName} />
            </div>
            <div className="input-group">
                <Input name="phone" value={state.phone[0]} setValue={state.phone[1]} error={error.phone} />
                <Input name="email" value={state.email[0]} setValue={state.email[1]} error={error.email} />
            </div>
        </>
    )
};

export default Form;