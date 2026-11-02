import {CloseSvg, SearchSvg} from "../Icons";
import Input from './Input';

const InputSearch = ({name, value, setValue}) => {
    return(
        <div className="input-search">
            <SearchSvg />
            <Input name={name} value={value} setValue={setValue} />
            {value.length ? <CloseSvg className="unset" onButtonClick={() => setValue('')} /> : ''}
        </div>
    )
};

export default InputSearch;