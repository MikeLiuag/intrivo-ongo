import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={20} cy={20} r={20} fill={props.color} />
      <Path
        d="M25.833 10.833H14.167c-.917 0-1.659.75-1.659 1.667L12.5 23.275c0 .575.292 1.083.733 1.383L20 29.167l6.758-4.509c.442-.3.734-.808.734-1.383L27.5 12.5c0-.917-.75-1.667-1.667-1.667zm-7.5 12.5l-4.166-4.166 1.175-1.175 2.991 2.983 6.325-6.325 1.175 1.183-7.5 7.5z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
