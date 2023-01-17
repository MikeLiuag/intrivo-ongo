import * as React from "react"
import Svg, {
  Mask,
  Path,
  G,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"

const VitaminBackground = (props) => (
    <Svg
    width="100%"
     preserveAspectRatio="xMinYMin slice" 
    height={220}
    viewBox="0 0 375 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={420}
      height={220}
    >
      <Path fill="#D5D5D5" d="M0 0h420.049v200H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path fill="url(#b)" d="M0 0h420.049v200H0z" />
      <Path
        d="m275.445 63.806-4.238-4.238c-4.238-4.238-11.083-4.129-15.212 0l-.109.109c-4.238 4.238-4.238 11.083 0 15.212l4.238 4.238c4.238 4.238 10.974 4.238 15.212 0l.109-.108c4.238-4.13 4.238-11.084 0-15.213Zm-33.033 69.109h-11.083a10.713 10.713 0 0 0-10.758 10.757v.109a10.713 10.713 0 0 0 10.758 10.757h10.974c6.085.109 10.866-4.672 10.866-10.649v-.108c0-6.085-4.781-10.866-10.757-10.866Zm97.795-108.118h-.109c-6.085 0-10.866 4.78-10.866 10.757v10.432a10.713 10.713 0 0 0 10.758 10.757h.108c6.085.109 10.866-4.672 10.866-10.649v-10.54a10.713 10.713 0 0 0-10.757-10.757Zm84.104 34.88c-4.238-4.238-11.084-4.238-15.321-.109l-4.238 4.238c-4.238 4.238-4.238 11.083 0 15.213l.108.108c4.238 4.238 11.084 4.238 15.213 0l4.238-4.238c4.238-4.237 4.238-10.974 0-15.212Zm-19.668 164.078 4.238 4.238a10.82 10.82 0 0 0 15.321 0 10.82 10.82 0 0 0 0-15.321l-4.238-4.238c-4.237-4.238-11.083-4.129-15.212 0-4.347 4.347-4.347 11.084-.109 15.321Zm22.384-80.083v.109a10.713 10.713 0 0 0 10.758 10.757h10.975a10.712 10.712 0 0 0 10.757-10.757v-.109a10.712 10.712 0 0 0-10.757-10.757h-10.975a10.713 10.713 0 0 0-10.758 10.757Zm-86.929-65.088c-35.966 0-65.196 29.23-65.196 65.197 0 35.966 29.23 65.196 65.196 65.196 35.967 0 65.197-29.23 65.197-65.196 0-35.967-29.23-65.197-65.197-65.197Zm-.108 184.181h.108a10.713 10.713 0 0 0 10.758-10.758v-10.431a10.713 10.713 0 0 0-10.758-10.758h-.108a10.713 10.713 0 0 0-10.758 10.758v10.431a10.713 10.713 0 0 0 10.758 10.758Zm-84.104-34.881a10.82 10.82 0 0 0 15.321 0l4.238-4.237c4.238-4.238 4.129-11.084 0-15.213l-.109-.109a10.822 10.822 0 0 0-15.321 0l-4.238 4.238c-4.129 4.347-4.129 11.084.109 15.321Z"
        fill="#008ED5"
        opacity={0.2}
      />
      <Path
        d="m-17.557-23.259-1.987-1.988c-1.988-1.987-5.2-1.936-7.136 0l-.051.052c-1.988 1.987-1.988 5.198 0 7.135l1.988 1.988a5.015 5.015 0 0 0 7.135 0l.051-.05c1.988-1.938 1.988-5.2 0-7.137ZM-33.05 9.158h-5.2a5.025 5.025 0 0 0-5.045 5.046v.051a5.025 5.025 0 0 0 5.046 5.046h5.148a4.963 4.963 0 0 0 5.097-4.995v-.05c0-2.855-2.243-5.098-5.046-5.098Zm45.873-50.715h-.051c-2.855 0-5.097 2.243-5.097 5.046v4.893a5.025 5.025 0 0 0 5.046 5.046h.05a4.963 4.963 0 0 0 5.098-4.995v-4.944a5.025 5.025 0 0 0-5.046-5.046Zm39.45 16.362a5.123 5.123 0 0 0-7.186-.052l-1.988 1.988c-1.988 1.988-1.988 5.2 0 7.136l.05.051c1.988 1.988 5.2 1.988 7.136 0l1.988-1.988a5.015 5.015 0 0 0 0-7.136Zm-9.225 76.964 1.988 1.988a5.076 5.076 0 0 0 7.186 0 5.076 5.076 0 0 0 0-7.187l-1.987-1.988c-1.988-1.988-5.2-1.937-7.136 0-2.04 2.04-2.04 5.2-.051 7.187Zm10.5-37.565v.051a5.025 5.025 0 0 0 5.046 5.046h5.147a5.025 5.025 0 0 0 5.047-5.046v-.05a5.025 5.025 0 0 0-5.047-5.047h-5.148a5.025 5.025 0 0 0-5.045 5.046ZM12.77-16.326c-16.872 0-30.582 13.71-30.582 30.581s13.71 30.582 30.582 30.582c16.87 0 30.581-13.71 30.581-30.582 0-16.87-13.71-30.582-30.581-30.582Zm-.051 86.393h.05a5.025 5.025 0 0 0 5.047-5.046v-4.893a5.025 5.025 0 0 0-5.046-5.046h-.051a5.025 5.025 0 0 0-5.046 5.046v4.893a5.025 5.025 0 0 0 5.046 5.046Zm-39.451-16.361a5.076 5.076 0 0 0 7.187 0l1.987-1.988c1.988-1.988 1.937-5.199 0-7.136l-.05-.05a5.076 5.076 0 0 0-7.187 0l-1.988 1.987c-1.937 2.039-1.937 5.2.05 7.187Z"
        fill="#008ED5"
        opacity={0.1}
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={5.735}
        y1={0}
        x2={242.799}
        y2={277.13}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#7DCBF2" />
        <Stop offset={0.486} stopColor="#7DCBF2" stopOpacity={0.6} />
        <Stop offset={1} stopColor="#7DCBF2" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default VitaminBackground