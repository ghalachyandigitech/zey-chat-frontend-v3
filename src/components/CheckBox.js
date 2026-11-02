const CheckBox = ({name, checked, onChange}) => {
    return(
        <div>
            <label className="input-switch">
                <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}/>
                <div className="slider"> </div>
            </label>
            {name}
        </div>
    )
};

export default CheckBox;