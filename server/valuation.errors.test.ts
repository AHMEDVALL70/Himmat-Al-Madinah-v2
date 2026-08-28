import { describe, expect, it } from "vitest";
import { appErrorFormatter } from "./_core/trpc";
import { valuationInputSchema } from "./valuation";

describe("valuation validation errors", () => {
  it("formats invalid valuation input into field-level errors", () => {
    const parsed = valuationInputSchema.safeParse({
      consent: true,
      purpose: "sell",
      city: "",
      district: "",
      propertyType: "villa",
      areaSqm: 5,
      ageYears: -1,
      condition: "good",
      marketPricePerSqm: 0,
    });
    expect(parsed.success).toBe(false);
    if (parsed.success) return;
    const formatted = appErrorFormatter({ shape: { data: { code: "BAD_REQUEST" } }, error: { cause: parsed.error } });
    expect(formatted.data.zodError.fieldErrors).toMatchObject({ city: expect.any(Array), district: expect.any(Array), areaSqm: expect.any(Array) });
  });
});
