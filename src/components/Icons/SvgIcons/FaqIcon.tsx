import React, { FC } from 'react';
import { CustomIconProps } from './types';

export const FaqIcon: FC<CustomIconProps> = ({ width, height, fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width || '45'} height={height || '45'} viewBox="0 0 54 54">
      <g transform="translate(174 -42.145)">
        <path
          d="M-147 42.145a27.031 27.031 0 0 0-27 27 27.071 27.071 0 0 0 13.689 23.5l1.4-2.472a24.224 24.224 0 0 1-12.25-21.024A24.185 24.185 0 0 1-147 44.987a24.185 24.185 0 0 1 24.158 24.158 24.19 24.19 0 0 1-22.737 24.117v-2.809h-2.842v5.692H-147a27.031 27.031 0 0 0 27-27 27.031 27.031 0 0 0-27-27z"
          fill={fill || '#3972bd'}
        />
        <path
          d="M-121.383 77.928a11.678 11.678 0 0 1-11.665 11.664h-1.415l-.039 9.054 2.842.012.027-6.292a14.528 14.528 0 0 0 13.092-14.438 14.523 14.523 0 0 0-14.507-14.507 14.524 14.524 0 0 0-14.507 14.507h2.842a11.678 11.678 0 0 1 11.664-11.665 11.678 11.678 0 0 1 11.666 11.665z"
          fill={fill || '#3972bd'}
          transform="translate(-13.918 -11.198)"
        />
      </g>
    </svg>
  );
};

export default FaqIcon;
