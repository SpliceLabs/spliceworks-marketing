import * as React from 'react';
export interface DialogProps {
  open: boolean;
  title?: React.ReactNode;
  eyebrow?: string;
  children?: React.ReactNode;
  /** Buttons rendered right-aligned in the footer */
  actions?: React.ReactNode;
  onClose?: () => void;
  /** Panel width (default 480) */
  width?: number | string;
  /** Render the panel in flow without the fixed overlay (for specimens) */
  inline?: boolean;
  style?: React.CSSProperties;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
