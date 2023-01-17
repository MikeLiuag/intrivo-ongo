import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Loader2(props) {
  return (
    <Svg
      width={26}
      height={26}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#7DCBF2" d="M26 0H0v26h26z" />
      <Path d="M12.37 12.82L0 0v26h26L12.37 12.82z" fill="#2A4D9B" />
    </Svg>
  )
}

export default Loader2
