import {useState} from "react";
import {ArrowSvg, SettingsSvg} from "../../Icons";

const SettingsMenu = ({menus}) => {
    const [opened, setOpened] = useState(0);
    const itemHeight = 48;
    const height = `${opened ? itemHeight*menus.length : 0}px`;
    const animationDelay = 0.5;

    return(
        <>
            <div className="item" onClick={() => setOpened(1-opened)}>
                <SettingsSvg />settings<ArrowSvg rotateUp={opened} />
            </div>
            <div style={{
                minHeight: height,
                maxHeight: height,
                transition: `max-height ${animationDelay}s ease-in, min-height ${animationDelay}s ease-out`
            }} className={'items'}>
                {menus}
            </div>
        </>
    )
};

export default SettingsMenu;