import React from 'react';

type AutoScrollStripProps = {
  children: React.ReactNode;
  speed?: 'slow' | 'normal' | 'fast' | number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
};

const AutoScrollStrip: React.FC<AutoScrollStripProps> = ({
  children,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = false,
}) => {
  
  const durationMap: { [key: string]: number } = {
    slow: 40,
    normal: 25,
    fast: 15,
  };

  const duration =
    typeof speed === 'number'
      ? speed
      : durationMap[speed] || durationMap.normal;

 
  const animationClass = `animate-[scroll_${duration}s_linear_${
    direction === 'right' ? 'reverse' : 'normal'
  }_infinite]`;

  return (
    <div
      className="group w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
    >
      <div
        className={`flex w-max items-center gap-x-8 py-4 ${animationClass} ${
          pauseOnHover ? 'group-hover:animate-paused' : ''
        }`}
      >
        {children}
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement, { 'aria-hidden': true })
        )}
      </div>
    </div>
  );
};

export default AutoScrollStrip;