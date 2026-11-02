import File from './File';
import {CloseSvg} from "../Icons";

const FileUpload = ({value, setValue, error=true, fileInput=null}) => {
    return (
        <div className="file-container">
            <div>
                {value[0] && <>
                    <File value={value} error={error}/>
                    <CloseSvg className="close-file-reader" onButtonClick={() => {
                        fileInput.current.value = '';
                        setValue(['', '']);
                    }} />
                </>}
            </div>
            <input type="file" hidden ref={fileInput} onChange={e => {
                const file = e.target.files[0];
                if(file) setValue([file.type, URL.createObjectURL(file)]);
            }} />
        </div>
    )
};

export default FileUpload;