import type { ReactNode } from "react";

export type CardView = {
  n: string;
  title: ReactNode;
  rows: readonly { label: ReactNode; value: ReactNode }[];
};

export const TableCards = ({ cards }: { cards: readonly CardView[] }) => (
  <div className="tcards">
    {cards.map((card) => (
      <article className="tcard" key={card.n}>
        <span className="tcard-n" aria-hidden="true">
          {card.n}
        </span>
        <h3 className="tcard-h">{card.title}</h3>
        <dl>
          {card.rows.map((row, i) => (
            <div className="tcard-row" key={i}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </article>
    ))}
  </div>
);
