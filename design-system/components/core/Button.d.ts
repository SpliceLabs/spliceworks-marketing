import * as React from 'react';
/**
 * Primary action control. Ink-filled by default; accent blue for the single most important action on a page.
 * @startingPoint section="Core" subtitle="Ink, accent, secondary, ghost and danger buttons" viewport="700x260"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 'primary' (ink) | 'accent' (blue) | 'secondary' (outlined) | 'ghost' | 'danger'. Default 'primary' */
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger';
  /** 32 / 40 / 48px tall. Default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Leading lucide icon name */
  icon?: string;
  /** Trailing lucide icon name */
  iconRight?: string;
  loading?: boolean;
  /** Full-width */
  block?: boolean;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
