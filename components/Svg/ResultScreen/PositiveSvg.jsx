import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M23.667 13.667h-10v10h-3.334v-10h-10v-3.334h10v-10h3.334v10h10v3.334z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
