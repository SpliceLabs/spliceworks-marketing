import * as React from 'react';
/**
 * Editorial content card: hairline border, 4px radius, mono eyebrow, medium heading. No shadow.
 * @startingPoint section="Display" subtitle="Article/teaser card with eyebrow, title, meta" viewport="700x300"
 */
export interface CardProps {
  /** Mono uppercase kicker in accent blue */
  eyebrow?: string;
  title?: React.ReactNode;
  /** Mono footer line, e.g. date · read time */
  meta?: React.ReactNode;
  /** Image URL or a placeholder node rendered 16:9 above the body */
  image?: string | React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** Ink background */
  inverse?: boolean;
  /** Hover: strong border + underlined title */
  interactive?: boolean;
  padding?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
