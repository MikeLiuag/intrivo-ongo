import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function Loader4(props) {
  return (
    <Svg
      width={26}
      height={26}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={13} cy={13} fill="#7DCBF2" r={13} />
    </Svg>
  )
}

export default Loader4
