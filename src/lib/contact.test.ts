import { describe, expect, it } from "vitest";
import { BOOK_TO, CONTACT_EMAIL } from "./contact";

describe("contact addresses", () => {
  it("shows hello@spliceops.ai by default and sends bookings to it", () => {
    expect(CONTACT_EMAIL).toBe("hello@spliceops.ai");
    expect(BOOK_TO).toBe("hello@spliceops.ai");
  });
});
