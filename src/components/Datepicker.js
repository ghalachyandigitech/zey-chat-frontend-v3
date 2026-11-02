import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const InputDate = ({value, onChange, className="input-date-mini"}) => {
    return(
        <div className="input">
            <DatePicker fixedHeight={true} selected={value} className={className}
                showTimeInput dateFormat="yyyy-MM-dd HH:mm" onChange={date => onChange(date)} />
        </div>
    )
};

export default InputDate;