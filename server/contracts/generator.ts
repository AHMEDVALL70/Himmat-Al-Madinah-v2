import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, rgb, type PDFPage, type PDFFont } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export type ContractKind = "residential" | "commercial";
export type ContractData = Record<string, string | number | undefined>;

type FieldSpec = { page: number; x: number; top: number; width: number; height?: number; align?: "left" | "right" };

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES = path.join(HERE, "templates");
const TEXT = rgb(0.08, 0.12, 0.14);
const WHITE = rgb(1, 1, 1);

const residentialFields: Record<string, FieldSpec> = {
  contractNo: { page: 0, x: 486, top: 191, width: 78 }, contractType: { page: 0, x: 280, top: 191, width: 76 },
  startDate: { page: 0, x: 474, top: 219, width: 90 }, endDate: { page: 0, x: 273, top: 219, width: 90 },
  lessorName: { page: 0, x: 279, top: 265, width: 285 }, lessorId: { page: 0, x: 476, top: 293, width: 88 },
  tenantName: { page: 0, x: 279, top: 438, width: 285 }, tenantId: { page: 0, x: 476, top: 466, width: 88 },
  propertyAddress: { page: 1, x: 279, top: 116, width: 285 }, city: { page: 1, x: 476, top: 145, width: 88 },
  district: { page: 1, x: 279, top: 145, width: 180 }, unitType: { page: 1, x: 476, top: 174, width: 88 },
  area: { page: 1, x: 279, top: 203, width: 88 }, annualRent: { page: 2, x: 276, top: 562, width: 92, height: 16 },
  paymentCycle: { page: 2, x: 138, top: 582, width: 72, height: 16 }, duration: { page: 2, x: 142, top: 602, width: 42, height: 16 },
  deposit: { page: 2, x: 276, top: 481, width: 92, height: 16 },
};

const commercialFields: Record<string, FieldSpec> = {
  contractNo: { page: 0, x: 486, top: 191, width: 78 }, contractType: { page: 0, x: 280, top: 191, width: 76 },
  startDate: { page: 0, x: 474, top: 219, width: 90 }, endDate: { page: 0, x: 273, top: 219, width: 90 },
  lessorName: { page: 0, x: 279, top: 265, width: 285 }, lessorCr: { page: 0, x: 476, top: 293, width: 88 },
  tenantName: { page: 0, x: 279, top: 438, width: 285 }, tenantCr: { page: 0, x: 476, top: 466, width: 88 },
  propertyAddress: { page: 1, x: 279, top: 116, width: 285 }, city: { page: 1, x: 476, top: 145, width: 88 },
  district: { page: 1, x: 279, top: 145, width: 180 }, activity: { page: 1, x: 279, top: 174, width: 285 },
  area: { page: 1, x: 279, top: 203, width: 88 }, annualRent: { page: 3, x: 350, top: 218, width: 94, height: 16 },
  paymentCycle: { page: 3, x: 252, top: 287, width: 72, height: 16 }, duration: { page: 3, x: 48, top: 84, width: 90, height: 16 },
  deposit: { page: 2, x: 276, top: 513, width: 92, height: 16 },
};

function sanitize(value: unknown): string {
  return String(value ?? "").replace(/[<>]/g, "").replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, 500);
}

function yFromTop(page: PDFPage, top: number, height: number) { return page.getHeight() - top - height; }
function fit(font: PDFFont, text: string, width: number) {
  let size = 8.2;
  while (size > 5.2 && font.widthOfTextAtSize(text, size) > width) size -= 0.3;
  return size;
}

function drawMappedText(page: PDFPage, font: PDFFont, raw: unknown, spec: FieldSpec) {
  const text = sanitize(raw);
  if (!text) return;
  const height = spec.height ?? 16;
  const size = fit(font, text, spec.width);
  const textWidth = font.widthOfTextAtSize(text, size);
  page.drawRectangle({ x: spec.x - 2, y: yFromTop(page, spec.top, height) - 2, width: spec.width + 4, height: height + 4, color: WHITE, opacity: 0.98 });
  const x = spec.align === "left" ? spec.x : spec.x + spec.width - textWidth;
  page.drawText(text, { x, y: yFromTop(page, spec.top, size), size, font, color: TEXT, maxWidth: spec.width });
}

export async function generateContractPdf(kind: ContractKind, input: ContractData): Promise<Buffer> {
  const template = path.join(TEMPLATES, `${kind}-contract.pdf`);
  const fontPath = path.join(TEMPLATES, "NotoSansArabic-Regular.ttf");
  const [templateBytes, fontBytes] = await Promise.all([readFile(template), readFile(fontPath)]);
  const pdf = await PDFDocument.load(templateBytes);
  pdf.registerFontkit(fontkit);
  const font = await pdf.embedFont(fontBytes, { subset: true });
  const fields = kind === "residential" ? residentialFields : commercialFields;
  const pages = pdf.getPages();
  if (pages.length !== 9) throw new Error(`${kind} contract template must contain exactly 9 pages`);
  for (const [key, value] of Object.entries(input)) {
    const spec = fields[key];
    if (spec && value !== undefined) drawMappedText(pages[spec.page], font, value, spec);
  }
  return Buffer.from(await pdf.save());
}

export const contractFieldMaps = { residential: residentialFields, commercial: commercialFields } as const;
