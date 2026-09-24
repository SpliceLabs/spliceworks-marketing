import * as React from 'react';
export interface TabItem { value: string; label: React.ReactNode; count?: number | string; }
export interface TabsProps {
  /** Strings or {value,label,count} */
  items: Array<string | TabItem>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): JSX.Element;
