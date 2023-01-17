import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19.35 6.04A7.49 7.49 0 0012 0C9.11 0 6.6 1.64 5.35 4.04A5.994 5.994 0 000 10c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 9v4h-4V9H7l5-5 5 5h-3z"
        fill="#2A4D9B"
      />
    </Svg>
  )
}

export default SvgComponent