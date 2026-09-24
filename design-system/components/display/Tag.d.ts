import * as React from 'react';
export interface TagProps {
  children?: React.ReactNode;
  /** Filled ink when selected (filter chips) */
  selected?: boolean;
  onClick?: () => void;
  /** Shows an × and makes the tag removable */
  onRemove?: () => void;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
