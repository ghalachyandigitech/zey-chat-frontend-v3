const Select = ({name, value, onChange, error, options, className='input-default'}) => {
    return(
        <div className={`select ${className}`}>
            <label>{name}</label>
            <select value={value} onChange={e => onChange(e.target.value)}>
                {options.map(([v, n]) => <option value={v}>{n}</option>)}
            </select>
            {error && <span className="error">{error}</span>}
        </div>
    )
};

export default Select;