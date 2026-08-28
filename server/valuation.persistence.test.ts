import { describe, expect, it, vi } from "vitest";

const { createValuationRecord, listMatchingMarketComparables } = vi.hoisted(() => ({ createValuationRecord: vi.fn(async (ref: string) => ({ requestId: 42, valuationRef: ref })), listMatchingMarketComparables: vi.fn(async () => []) }));
vi.mock("./db", () => ({ createValuationRecord, listMatchingMarketComparables }));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const ctx = { user: undefined, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] } as TrpcContext;

describe("valuation persistence seam", () => {
  it("passes the server-calculated result to the persistence helper", async () => {
    const caller = appRouter.createCaller(ctx);
    const result = await caller.valuation.submit({
      customerName: "عميل اختبار", customerPhone: "", customerEmail: "", consent: false,
      purpose: "sell", city: "المدينة المنورة", district: "العزيزية", propertyType: "villa",
      areaSqm: 280, ageYears: 8, condition: "good", marketPricePerSqm: 4200,
      downPaymentPercent: 20, annualRatePercent: 5.5, termYears: 25, comparables: [],
    });
    expect(result.valuationRef).toMatch(/^HM-/);
    expect(result.pointPrice).toBeGreaterThan(0);
    expect(createValuationRecord).toHaveBeenCalledWith(result.valuationRef, expect.objectContaining({ city: "المدينة المنورة" }), expect.objectContaining({ pointPrice: result.pointPrice }));
  });
});
