import { describe, expect, it } from "vitest";
import { disabledVisionAnalyzer } from "./vision";

describe("property vision seam", () => {
  it("does not make visual claims while analysis is disabled", async () => {
    const result = await disabledVisionAnalyzer.analyze([]);
    expect(result.enabled).toBe(false);
    expect(result.findings).toEqual([]);
    expect(result.note).toContain("not enabled");
  });
});
