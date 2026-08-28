import { describe, expect, it } from "vitest";
import { calculateRulesValuation, valuationInputSchema } from "./valuation";

describe("valuation engine", () => {
  const base = {
    customerName: "<b>عميل</b>", customerPhone: "", customerEmail: "", consent: true,
    purpose: "sell" as const, city: "المدينة المنورة", district: "العزيزية", propertyType: "villa" as const,
    areaSqm: 280, ageYears: 8, condition: "good" as const, marketPricePerSqm: 4200,
    downPaymentPercent: 20, annualRatePercent: 5.5, termYears: 25,
    comparables: [{ title: "صفقة اختبار", city: "المدينة المنورة", district: "العزيزية", propertyType: "villa" as const, areaSqm: 260, price: 1100000, sourceLabel: "مصدر معلن" }],
  };

  it("accepts valid inputs and normalizes numeric fields", () => {
    const parsed = valuationInputSchema.parse({ ...base, areaSqm: "280", ageYears: "8" });
    expect(parsed.areaSqm).toBe(280);
    expect(parsed.ageYears).toBe(8);
  });

  it("rejects unsafe or out-of-range property inputs", () => {
    expect(() => valuationInputSchema.parse({ ...base, areaSqm: 1 })).toThrow();
    expect(() => valuationInputSchema.parse({ ...base, customerEmail: "not-an-email" })).toThrow();
  });

  it("returns a bounded range, confidence, factors, and comparable inputs", () => {
    const result = calculateRulesValuation(valuationInputSchema.parse(base));
    expect(result.lowPrice).toBeLessThan(result.pointPrice);
    expect(result.pointPrice).toBeLessThan(result.highPrice);
    expect(result.confidence).toBeGreaterThanOrEqual(58);
    expect(result.confidence).toBeLessThanOrEqual(93);
    expect(result.factors.map((factor) => factor.key)).toEqual(expect.arrayContaining(["location", "area", "condition", "age", "type"]));
    expect(result.comparables).toHaveLength(1);
  });
});
