import * as React from 'react';
export interface RadioProps {
  label?: React.ReactNode;
  description?: string;
  /** Controlled state */
  checked?: boolean;
  defaultChecked?: boolean;
  /** Receives this radio's value */
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  value?: string;
  style?: React.CSSProperties;
}
export declare function Radio(props: RadioProps): JSX.Element;
