// @vitest-environment node
import { describe, expect, it } from "vitest";
import { GET } from "./route";

const get = (slug: string) =>
  GET(new Request(`http://localhost/log/${slug}/og.png`), { params: Promise.resolve({ slug }) });

describe("the generated log card", () => {
  it("renders a 1200 by 630 png for a live entry", async () => {
    const response = await get("jev");
    const bytes = Buffer.from(await response.arrayBuffer());
    expect(response.headers.get("content-type")).toBe("image/png");
    expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([1200, 630]);
  }, 30_000);

  it("answers 404 for an entry that does not exist", async () => {
    expect((await get("no-such-entry")).status).toBe(404);
  });
});
