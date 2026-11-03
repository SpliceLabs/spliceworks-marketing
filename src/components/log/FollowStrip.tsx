import { SAME_AS } from "@/lib/site";

export const FollowStrip = () => (
  <aside className="lg-follow" aria-label="Follow the Splice Log">
    <div>
      <h3>Follow the Splice Log</h3>
      <p>New entries show up here first. Subscribe by RSS, or find us on LinkedIn.</p>
    </div>
    <div className="pills">
      <a className="btn" href="/log/feed.xml">
        RSS feed
      </a>
      <a className="btn" href={SAME_AS[0]} rel="noopener noreferrer" target="_blank">
        LinkedIn
      </a>
    </div>
  </aside>
);
