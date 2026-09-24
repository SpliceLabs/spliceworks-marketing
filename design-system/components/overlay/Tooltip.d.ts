import * as React from 'react';
export interface TooltipProps {
  label: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  /** Force visible (specimens) */
  alwaysOpen?: boolean;
  style?: React.CSSProperties;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
