import * as React from 'react';
export interface ToastProps {
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** e.g. a small Button */
  action?: React.ReactNode;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;
