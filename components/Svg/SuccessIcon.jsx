import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m17.627 9.72-5.72 5.733-2.2-2.2a1.334 1.334 0 1 0-1.88 1.88l3.133 3.147a1.336 1.336 0 0 0 1.88 0l6.666-6.667a1.333 1.333 0 1 0-1.88-1.893ZM14 .667a13.333 13.333 0 1 0 0 26.666A13.333 13.333 0 0 0 14 .667Zm0 24a10.667 10.667 0 1 1 0-21.335 10.667 10.667 0 0 1 0 21.335Z"
      fill="#49C37C"
    />
  </Svg>
)

export default SvgComponent