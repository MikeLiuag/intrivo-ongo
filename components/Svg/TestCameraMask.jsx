import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={146}
    height={430}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M64 0H16C7.163 0 0 7.163 0 16v190h4V16C4 9.373 9.373 4 16 4h48V0Zm0 426H16c-6.627 0-12-5.373-12-12V235H0v179c0 8.837 7.163 16 16 16h48v-4Zm18 4v-4h48c6.627 0 12-5.373 12-12V235h4v179c0 8.837-7.163 16-16 16H82ZM82 4V0h48c8.837 0 16 7.163 16 16v190h-4V16c0-6.627-5.373-12-12-12H82Z"
      fill="#fff"
    />
  </Svg>
)

export default SvgComponent