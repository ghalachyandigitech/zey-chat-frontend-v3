import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";

const AngleSlider = () => {
    const dispatch = useDispatch();

    function test1({width, height, left, top}){

    }

    const [degree, setDegree] = useState(0);

    return(
        <div>
            <div className="ttttrrrr" onMouseDown={() => {}} onMouseUp={() => {}}
                 onMouseMove={function(e){
                     if(!test) return;

                     const {width, height, left, top} = e.target.getBoundingClientRect();


                     let angle = (Math.atan2((height / 2) + top - e.pageY, (width / 2) + left - e.pageX) * (180 / Math.PI)) - 90;
                     if (angle < 0) angle = 360 + angle;
                     setDegree(Math.round(angle)-90);
                 }}
            >
                <span style={{transform: 'rotate(' + degree + 'deg)'}} className="kkll"> </span>
            </div>
            <input style={{width: '40px'}} value={degree} type="number"/>
        </div>
    )
};

export default AngleSlider;