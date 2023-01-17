import * as React from "react"
import Svg, { Mask, Rect, G, Path, Defs, ClipPath } from "react-native-svg"

const SvgComponent = ({
    host,
    big
}) => {
  if(big) {
    return host ? (
      <Svg
    width={64}
    height={64}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={64}
      height={64}
    >
      <Rect width={64} height={64} rx={12.8} fill="#2A4D9B" />
    </Mask>
    <G>
      <Rect width={64} height={64} rx={12.8} fill="#2A4D9B" />
      <Path
        opacity={0.1}
        fill="#fff"
        d="M30.4-1.6H64v67.2H30.4zM0 28.8h30.4v36.8H0z"
      />
      <Path opacity={0.1} fill="#fff" d="M0 28.8h30.4v36.8H0z" />
      <Path opacity={0.1} d="M64 0v64L30.609 30.476 0 0h64Z" fill="#fff" />
      <Path opacity={0.1} fill="#fff" d="M0-1.6h64v30.4H0z" />
    </G>
    <Rect
      x={24.615}
      y={16}
      width={4.923}
      height={9.846}
      rx={1.333}
      fill="#EC8950"
    />
    <Rect
      x={34.461}
      y={16}
      width={4.923}
      height={9.846}
      rx={1.333}
      fill="#EC8950"
    />
    <Rect
      x={18.461}
      y={20.923}
      width={27.077}
      height={27.077}
      rx={2.667}
      fill="#F6C34C"
    />
    <Mask
      id="b"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={18}
      y={20}
      width={28}
      height={28}
    >
      <Rect
        x={18.461}
        y={20.923}
        width={27.077}
        height={27.077}
        rx={2.667}
        fill="#fff"
      />
    </Mask>
    <G mask="url(#b)" fill="#EC8950">
      <Path d="m18.461 33.23 7.385 7.385L33.231 48H18.46V33.23Z" />
      <Path
        opacity={0.7}
        d="m33.23 48-7.384-7.385-7.384-7.384h9.846a4.923 4.923 0 0 1 4.923 4.923V48Z"
      />
      <Rect
        opacity={0.7}
        x={24.615}
        y={16}
        width={4.923}
        height={9.846}
        rx={1.333}
      />
      <Rect
        opacity={0.7}
        x={34.461}
        y={16}
        width={4.923}
        height={9.846}
        rx={1.333}
      />
    </G>
  </Svg>
    ) : (
      <Svg
    width={64}
    height={64}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#a)">
      <Mask
        id="b"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={64}
        height={64}
      >
        <Rect width={64} height={64} rx={12.8} fill="#2A4D9B" />
      </Mask>
      <G>
        <Rect width={64} height={64} rx={12.8} fill="#F6C34C" />
        <Path
          opacity={0.1}
          fill="#fff"
          d="M30.4-1.6H64v67.2H30.4zM0 28.8h30.4v36.8H0z"
        />
        <Path opacity={0.1} fill="#fff" d="M0 28.8h30.4v36.8H0z" />
        <Path opacity={0.1} d="M64 0v64L30.609 30.476 0 0h64Z" fill="#fff" />
      </G>
      <Rect
        x={24.615}
        y={16}
        width={4.923}
        height={9.846}
        rx={1.333}
        fill="#EC8950"
      />
      <Rect
        x={34.461}
        y={16}
        width={4.923}
        height={9.846}
        rx={1.333}
        fill="#EC8950"
      />
      <Rect
        x={18.461}
        y={20.923}
        width={27.077}
        height={27.077}
        rx={2.667}
        fill="#2A4D9B"
      />
      <Mask
        id="c"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={18}
        y={20}
        width={28}
        height={28}
      >
        <Rect
          x={18.461}
          y={20.923}
          width={27.077}
          height={27.077}
          rx={2.667}
          fill="#fff"
        />
      </Mask>
      <G mask="url(#c)" fill="#EC8950">
        <Path d="m18.461 33.23 7.385 7.385L33.231 48H18.46V33.23Z" />
        <Path
          opacity={0.7}
          d="m33.23 48-7.384-7.385-7.384-7.384h9.846a4.923 4.923 0 0 1 4.923 4.923V48Z"
        />
        <Rect
          opacity={0.7}
          x={24.615}
          y={16}
          width={4.923}
          height={9.846}
          rx={1.333}
        />
        <Rect
          opacity={0.7}
          x={34.461}
          y={16}
          width={4.923}
          height={9.846}
          rx={1.333}
        />
      </G>
      <Path opacity={0.1} fill="#fff" d="M0-1.6h64v30.4H0z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h64v64H0z" />
      </ClipPath>
    </Defs>
  </Svg>
    )
  } 
  return host ? (
  <Svg
    width={40}
    height={40}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={40}
      height={40}
    >
      <Rect width={40} height={40} rx={8} fill="#2A4D9B" />
    </Mask>
    <G>
      <Rect width={40} height={40} rx={8} fill="#2A4D9B" />
      <Path opacity={0.1} fill="#fff" d="M19-1h21v42H19zM0 18h19v23H0z" />
      <Path opacity={0.1} fill="#fff" d="M0 18h19v23H0z" />
      <Path opacity={0.1} d="M40 0v40L19.13 19.048 0 0h40Z" fill="#fff" />
      <Path opacity={0.1} fill="#fff" d="M0-1h40v19H0z" />
    </G>
    <Rect x={14.461} y={8} width={3.692} height={7.385} rx={1} fill="#EC8950" />
    <Rect x={21.846} y={8} width={3.692} height={7.385} rx={1} fill="#EC8950" />
    <Rect
      x={9.846}
      y={11.692}
      width={20.308}
      height={20.308}
      rx={2}
      fill="#F6C34C"
    />
    <Mask
      id="b"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={9}
      y={11}
      width={22}
      height={21}
    >
      <Rect
        x={9.846}
        y={11.692}
        width={20.308}
        height={20.308}
        rx={2}
        fill="#fff"
      />
    </Mask>
    <G mask="url(#b)" fill="#EC8950">
      <Path d="m9.846 20.923 5.539 5.539L20.923 32H9.846V20.923Z" />
      <Path
        opacity={0.7}
        d="m20.923 32-5.538-5.538-5.539-5.539h7.385a3.692 3.692 0 0 1 3.692 3.692V32Z"
      />
      <Rect
        opacity={0.7}
        x={14.461}
        y={8}
        width={3.692}
        height={7.385}
        rx={1}
      />
      <Rect
        opacity={0.7}
        x={21.846}
        y={8}
        width={3.692}
        height={7.385}
        rx={1}
      />
    </G>
  </Svg>
) : (
    <Svg
    width={40}
    height={40}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={40}
      height={40}
    >
      <Rect width={40} height={40} rx={8} fill="#F6C34C" />
    </Mask>
    <G mask="url(#a)">
      <Rect width={40} height={40} rx={8} fill="#F6C34C" />
      <Path opacity={0.1} fill="#fff" d="M19-1h21v42H19zM0 18h19v23H0z" />
      <Path opacity={0.1} fill="#fff" d="M0 18h19v23H0z" />
      <Path opacity={0.1} d="M40 0v40L19.13 19.048 0 0h40Z" fill="#fff" />
      <Path opacity={0.1} fill="#fff" d="M0-1h40v19H0z" />
    </G>
    <Rect x={14.461} y={8} width={3.692} height={7.385} rx={1} fill="#EC8950" />
    <Rect x={21.846} y={8} width={3.692} height={7.385} rx={1} fill="#EC8950" />
    <Rect
      x={9.846}
      y={11.692}
      width={20.308}
      height={20.308}
      rx={2}
      fill="#2A4D9B"
    />
    <Mask
      id="b"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={9}
      y={11}
      width={22}
      height={21}
    >
      <Rect
        x={9.846}
        y={11.692}
        width={20.308}
        height={20.308}
        rx={2}
        fill="#fff"
      />
    </Mask>
    <G mask="url(#b)" fill="#EC8950">
      <Path d="m9.846 20.923 5.539 5.539L20.923 32H9.846V20.923Z" />
      <Path
        opacity={0.7}
        d="m20.923 32-5.538-5.538-5.539-5.539h7.385a3.692 3.692 0 0 1 3.692 3.692V32Z"
      />
      <Rect
        opacity={0.7}
        x={14.461}
        y={8}
        width={3.692}
        height={7.385}
        rx={1}
      />
      <Rect
        opacity={0.7}
        x={21.846}
        y={8}
        width={3.692}
        height={7.385}
        rx={1}
      />
    </G>
  </Svg>
)}

export default SvgComponent