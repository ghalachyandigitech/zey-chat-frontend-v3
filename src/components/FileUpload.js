import {useRef, useState} from "react";
import File from './File';
import {CloseSvg, FileUploadProfileSvg} from "../Icons";

const FileUpload = ({name, value, onClose, onUpload, error}) => {
    const [upload, setUpload] = useState(['', '']);
    const file = upload[0] && upload || value;
    const fileInput = useRef(null);

    return (<>
        <div className="file-container">
            <div>
                {name}
                <div className="circle-image" onClick={() => fileInput.current.click()}>
                    {(file[0] && <File value={file} />) || <FileUploadProfileSvg />}
                </div>
                {file[0] && <CloseSvg className="close-file-reader" onButtonClick={() => {
                    {!upload[0] && onClose()}
                    setUpload(['', '']);
                }} />}
            </div>
            {upload[0] && <button className="button" onClick={() => {
                onUpload(fileInput.current.files[0]);

                setUpload(['', '']);
            }}>upload</button>}
            <input type="file" hidden ref={fileInput} onChange={e => {
                const file = e.target.files[0];
                if(file) setUpload([file.type, URL.createObjectURL(file)]);
            }} />
        </div>
        <span className="error">{error}</span>
    </>)
};

export default FileUpload;