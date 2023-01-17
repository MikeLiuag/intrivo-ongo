import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RightIconSvg(props) {
  return (
    <Svg
      width={11}
      height={16}
      viewBox="0 0 11 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.333 0L.453 1.88 6.56 8 .453 14.12 2.333 16l8-8-8-8z"
        fill="#5C5C5C"
      />
    </Svg>
  )
}

export default RightIconSvg
