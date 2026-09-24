import * as React from 'react';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Lucide icon name in kebab-case, e.g. "arrow-right" */
  name: string;
  /** Pixel size (default 18) */
  size?: number;
  /** Default 1.5 — matches the outlined W of the mark */
  strokeWidth?: number;
}
export declare function Icon(props: IconProps): JSX.Element;
