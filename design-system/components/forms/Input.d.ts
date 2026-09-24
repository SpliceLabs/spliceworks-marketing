import * as React from 'react';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Mono uppercase eyebrow label */
  label?: string;
  /** Right-aligned helper text in the label row */
  hint?: string;
  /** Error message; turns the border red */
  error?: string;
  /** Leading lucide icon */
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
}
export declare function Input(props: InputProps): JSX.Element;
