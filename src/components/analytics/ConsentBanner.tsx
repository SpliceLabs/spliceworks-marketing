import Link from "next/link";

type ConsentBannerProps = {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
};

export const ConsentBanner = ({ open, onAccept, onDecline }: ConsentBannerProps) =>
  open ? (
    <aside className="consent" role="region" aria-label="Cookie choice">
      <p>
        We use one script to see which companies visit this site. <Link href="/privacy">Privacy notice</Link>
      </p>
      <div className="consent-actions">
        <button type="button" className="btn sm" onClick={onAccept}>
          Accept
        </button>
        <button type="button" className="btn sm" onClick={onDecline}>
          Decline
        </button>
      </div>
    </aside>
  ) : null;
