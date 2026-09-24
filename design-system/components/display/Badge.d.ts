import * as React from 'react';
export interface BadgeProps {
  tone?: 'neutral' | 'accent' | 'joint' | 'success' | 'warning' | 'danger' | 'ink';
  /** Leading status dot */
  dot?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
