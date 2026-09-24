import * as React from 'react';
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  hint?: string;
  /** Strings or {value,label} pairs */
  options: Array<string | { value: string; label: string }>;
  size?: 'sm' | 'md' | 'lg';
}
export declare function Select(props: SelectProps): JSX.Element;
