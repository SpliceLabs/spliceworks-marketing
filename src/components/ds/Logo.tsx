import Link from "next/link";

export const Logo = ({ href }: { href: string }) => (
  <Link className="logo" href={href} aria-label="SpliceOps home">
    <b>Splice</b>
    <span>Ops</span>
    <i>.</i>
  </Link>
);
