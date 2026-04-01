'use client';

import { HTMLAttributes } from 'react';

type LordIconProps = HTMLAttributes<HTMLElement> & {
  src: string;
  trigger?: string;
  colors?: string;
  stroke?: string;
  delay?: string | number;
  size?: number;
};

export default function LordIcon({
  src,
  trigger = 'hover',
  colors,
  stroke,
  delay,
  size = 18,
  ...props
}: LordIconProps) {
  return (
    <lord-icon
      {...(props as any)}
      src={src}
      trigger={trigger}
      colors={colors}
      stroke={stroke}
      delay={delay}
      style={{ width: `${size}px`, height: `${size}px`, ...(props.style || {}) }}
    />
  );
}