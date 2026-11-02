const Input = ({name, value, setValue, error, className="input-default"}) => {
    return(
        <div className={`input ${className}`}>
            <input value={value} onChange={e => setValue(e.target.value)} required={true} />
            <label>{name}</label>
            {error && <span className="error">{error}</span>}
        </div>
    )
};

export default Input;