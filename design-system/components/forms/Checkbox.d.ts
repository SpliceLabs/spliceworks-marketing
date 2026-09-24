import * as React from 'react';
export interface CheckboxProps {
  label?: React.ReactNode;
  description?: string;
  /** Controlled state */
  checked?: boolean;
  defaultChecked?: boolean;
  /** Receives the next boolean */
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  value?: string;
  style?: React.CSSProperties;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
