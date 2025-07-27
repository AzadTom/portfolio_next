export function GetRedirectIcon({color = "#ffffff"}:{color?:string}) {
  return (
    <svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        clipPath="url(#clip0_1272_1073)"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.693 13.16l7.5-7.5M5.693 5.66h7.5v7.5" />
      </g>
      <defs>
        <clipPath id="clip0_1272_1073">
          <path fill="#fff" transform="translate(.443 .41)" d="M0 0H18V18H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}