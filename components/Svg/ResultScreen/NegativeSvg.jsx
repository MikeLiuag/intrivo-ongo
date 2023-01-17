import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NegativeSvg(props) {
  return (
    <Svg
      width={24}
      height={4}
      viewBox="0 0 24 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M23.667 3.667H.333V.333h23.334v3.334z" fill="#fff" />
    </Svg>
  )
}

export default NegativeSvg
