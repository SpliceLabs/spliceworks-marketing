import { ImageResponse } from "next/og";
import { getEntry, getLog } from "@/lib/log/get-log";
import { TYPE_LABELS } from "@/lib/log/types";

type Props = { params: Promise<{ slug: string }> };

const SIZE = { width: 1200, height: 630 } as const;

const WASH: Readonly<Record<string, string>> = {
  tool: "radial-gradient(ellipse at 42% 50%, #F2A65A 0, transparent 52%), radial-gradient(ellipse at 60% 50%, #E8899A 0, transparent 52%), #EEEAE2",
  case: "radial-gradient(ellipse at 35% 42%, #F7D26A 0, transparent 55%), radial-gradient(ellipse at 66% 60%, #F2A65A 0, transparent 55%), #EEEAE2",
  research:
    "radial-gradient(ellipse at 38% 55%, #7CC5B8 0, transparent 55%), radial-gradient(ellipse at 64% 45%, #BFE6D4 0, transparent 55%), #EEEAE2",
  analysis:
    "radial-gradient(ellipse at 36% 52%, #E8899A 0, transparent 55%), radial-gradient(ellipse at 66% 48%, #F7D26A 0, transparent 55%), #EEEAE2",
  perspective:
    "radial-gradient(ellipse at 50% 62%, #F28A4F 0, transparent 55%), radial-gradient(ellipse at 38% 38%, #E8899A 0, transparent 52%), #EEEAE2",
  guide:
    "radial-gradient(ellipse at 36% 50%, #BFE6D4 0, transparent 55%), radial-gradient(ellipse at 64% 52%, #F7D26A 0, transparent 55%), #EEEAE2",
};

export const dynamicParams = false;

export const generateStaticParams = () => getLog().map(({ slug }) => ({ slug }));

export async function GET(_request: Request, { params }: Props) {
  const entry = getEntry((await params).slug);
  if (!entry) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 68,
        color: "#16161A",
        background: WASH[entry.type],
      }}
    >
      <div style={{ display: "flex", fontSize: 26, letterSpacing: 3, textTransform: "uppercase" }}>
        {`Splice Log · ${entry.code} · ${TYPE_LABELS[entry.type]}`}
      </div>
      <div style={{ display: "flex", maxWidth: 820, fontSize: 76, fontWeight: 700, lineHeight: 1.04 }}>
        {entry.title}
      </div>
      <div style={{ display: "flex", fontSize: 38, fontWeight: 700 }}>SpliceOps</div>
    </div>,
    SIZE,
  );
}
