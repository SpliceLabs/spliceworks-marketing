import * as React from 'react';
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name */
  icon: string;
  /** Accessible label (required) */
  label: string;
  variant?: 'ghost' | 'secondary' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  /** Highlighted (accent) state, e.g. a toggled tool */
  active?: boolean;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
