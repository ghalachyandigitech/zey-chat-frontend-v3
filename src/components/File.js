import {FileErrorSvg, LoadingGif} from "../Icons";
import {IMAGE_EXT, VIDEO_EXT} from "../Constants";

const File = ({value, error=false}) => {
    const fileClick = () => window.open('', '_blank').location.href = value[1];

    return (
        (value[0] === 'loading' && <LoadingGif />)
        || (IMAGE_EXT.includes(value[0]) && <img onClick={fileClick} src={value[1] }/>)
        || (VIDEO_EXT.includes(value[0]) && <video onClick={fileClick} controls="controls" src={value[1]} />)
        || (error && value[0] && <FileErrorSvg />)
    )
};

export default File;