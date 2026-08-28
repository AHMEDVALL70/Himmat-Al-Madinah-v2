import { describe, expect, it } from "vitest";
import { marketComparableInputSchema } from "./valuation";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("market comparables", () => {
  it("normalizes and validates a comparable sale", () => {
    const parsed = marketComparableInputSchema.parse({
      title: "<b>صفقة العزيزية</b>", city: "المدينة المنورة", district: "العزيزية", propertyType: "villa",
      areaSqm: "250", ageYears: "5", condition: "good", price: "1200000", saleDate: "2026-08-01", sourceLabel: "مصدر معلن",
    });
    expect(parsed.title).toBe("صفقة العزيزية");
    expect(parsed.areaSqm).toBe(250);
    expect(parsed.price).toBe(1200000);
  });

  it("rejects non-admin access to comparable management", async () => {
    const ctx = { user: undefined, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] } as TrpcContext;
    await expect(appRouter.createCaller(ctx).comparables.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
