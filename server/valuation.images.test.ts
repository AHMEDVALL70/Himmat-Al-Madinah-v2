import { describe, expect, it } from "vitest";
import { valuationImagesInputSchema } from "./valuation";

describe("valuation image input", () => {
  it("sanitizes storage-facing names and accepts a valid compressed payload", () => {
    const parsed = valuationImagesInputSchema.parse({
      valuationRef: "HM-ABC123-XYZ99",
      images: [{ originalName: "../واجهة المنزل.png", mimeType: "image/png", sizeBytes: 16, position: 0, dataBase64: "QUJDREVGR0hJSktMTU5PUA==" }],
    });
    expect(parsed.images[0]?.originalName).toBe(".._____________.png");
  });

  it("rejects unsupported media, oversized files, and malformed references", () => {
    const result = valuationImagesInputSchema.safeParse({
      valuationRef: "bad-ref",
      images: [{ originalName: "x.jpg", mimeType: "image/gif", sizeBytes: 9 * 1024 * 1024, position: 6, dataBase64: "bad" }],
    });
    expect(result.success).toBe(false);
  });
});
