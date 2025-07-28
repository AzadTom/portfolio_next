import React from 'react'

const Logo = () => {
  return (
    <div>
        <LogoIcon/>
    </div>
  )
}

export default Logo;


function LogoIcon() {
  return (
    <svg
      width={45}
      height={45}
      viewBox="0 0 136 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M99.112 128.481C121.019 117.189 136 94.344 136 68c0-37.555-30.445-68-68-68S0 30.445 0 68c0 26.728 15.42 49.854 37.85 60.967l20.878-57.414h19.765l20.619 56.928zm-15.701 5.765l-14.895-41.61-14.971 41.824A68.228 68.228 0 0068 136c5.3 0 10.46-.606 15.411-1.754z"
        fill="url(#paint0_linear_429_6)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_429_6"
          x1={68}
          y1={0}
          x2={68}
          y2={136}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffffff" />
          <stop offset={1} stopColor="#ffffff" stopOpacity={0.51} />
        </linearGradient>
      </defs>
    </svg>
  )
}


