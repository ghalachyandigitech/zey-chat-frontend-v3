const Textarea = ({name, value, setValue, error}) => {
    return(
        <div className="input textarea">
            <textarea required={true} value={value} onChange={e => setValue(e.target.value)}> </textarea>
            <label><span>{name}</span></label>
            <div>{error}</div>
        </div>
    )
};

export default Textarea;