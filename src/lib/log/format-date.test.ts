import { describe, expect, it } from "vitest";
import { formatLogDate } from "./format-date";

describe("formatLogDate", () => {
  it("writes an ISO date as D MMM YYYY", () => {
    expect(formatLogDate("2026-11-04")).toBe("4 Nov 2026");
    expect(formatLogDate("2026-09-06")).toBe("6 Sep 2026");
    expect(formatLogDate("2027-01-31")).toBe("31 Jan 2027");
  });

  it("uses a three letter English month for all twelve months", () => {
    const months = Array.from({ length: 12 }, (_, i) => formatLogDate(`2026-${String(i + 1).padStart(2, "0")}-15`));
    expect(months.map((m) => m.split(" ")[1])).toEqual([
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]);
  });

  it("does not shift the day across time zones", () => {
    expect(formatLogDate("2026-03-01")).toBe("1 Mar 2026");
    expect(formatLogDate("2026-12-31")).toBe("31 Dec 2026");
  });

  it("rejects anything that is not a real ISO calendar date", () => {
    expect(() => formatLogDate("04.11.2026")).toThrow();
    expect(() => formatLogDate("2026-13-01")).toThrow();
    expect(() => formatLogDate("2026-02-30")).toThrow();
    expect(() => formatLogDate("")).toThrow();
  });
});
