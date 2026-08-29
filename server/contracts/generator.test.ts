import { describe, expect, it } from "vitest";
import { PDFDocument } from "pdf-lib";
import { generateContractPdf } from "./generator";

describe("contract PDF generator", () => {
  it.each(["residential", "commercial"] as const)("preserves the nine-page %s template", async kind => {
    const bytes = await generateContractPdf(kind, {
      contractNo: "TEST-001",
      lessorName: "<مؤجر>",
      tenantName: "مستأجر",
      annualRent: "150000",
      deposit: "5000",
    });
    const pdf = await PDFDocument.load(bytes);
    expect(pdf.getPageCount()).toBe(9);
    expect(bytes.byteLength).toBeGreaterThan(100_000);
  });
});
