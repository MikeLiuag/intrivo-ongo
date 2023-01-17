import * as React from "react"
import Svg, { Ellipse } from "react-native-svg"

function Loader4(props) {
  return (
    <Svg
      width={9}
      height={9}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Ellipse cx="4.5" cy="4.25" rx="4.5" ry="4.25" fill="white"/>
    </Svg>
  )
}

export default Loader4
