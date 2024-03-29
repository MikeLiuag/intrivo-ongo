import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 18 12" {...props}>
            <Path
                fill="#000"
                d="M4.655 8.256A18.377 18.377 0 012.185 6a18.377 18.377 0 012.47-2.256C5.992 2.746 7.477 2 8.86 2s2.868.746 4.205 1.744A18.378 18.378 0 0115.535 6a18.378 18.378 0 01-2.47 2.256C11.728 9.254 10.243 10 8.86 10s-2.868-.746-4.205-1.744zM8.86 0C6.824 0 4.906 1.061 3.459 2.141 1.986 3.241.85 4.474.359 5.042a1.458 1.458 0 000 1.916c.492.568 1.627 1.801 3.1 2.9C4.906 10.939 6.824 12 8.859 12c2.037 0 3.955-1.061 5.402-2.141a20.594 20.594 0 003.1-2.901 1.458 1.458 0 000-1.916 20.594 20.594 0 00-3.1-2.9C12.814 1.061 10.896 0 8.86 0zm0 8a2 2 0 100-4 2 2 0 000 4z"
            />
        </Svg>
    );
}

export default SvgComponent;
