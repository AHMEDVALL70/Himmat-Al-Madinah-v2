import { z } from "zod";

function sanitizeText(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim();
}
function text(max: number, min = 0) { return z.string().transform(sanitizeText).refine((value) => value.length >= min && value.length <= max, `Text must be between ${min} and ${max} characters`); }
const optionalText = (max: number) => z.string().optional().default("").transform(sanitizeText).refine((value) => value.length <= max);
export const propertyTypeSchema = z.enum(["apartment", "villa", "land", "office", "shop", "building"]);
export const conditionSchema = z.enum(["new", "excellent", "good", "fair", "needs_work"]);
export const comparableInputSchema = z.object({
  title: text(160, 2), city: text(80, 2), district: text(120, 2), propertyType: propertyTypeSchema,
  areaSqm: z.coerce.number().finite().min(20).max(100000), price: z.coerce.number().finite().min(1000).max(1000000000), sourceLabel: text(160, 2),
});
export const marketComparableInputSchema = comparableInputSchema.extend({
  ageYears: z.coerce.number().int().min(0).max(150), condition: conditionSchema, saleDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid sale date"),
});

export const valuationImageInputSchema = z.object({
  originalName: text(160, 1).transform((value) => value.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120)),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  sizeBytes: z.coerce.number().int().min(1).max(8 * 1024 * 1024),
  position: z.coerce.number().int().min(0).max(4),
  dataBase64: z.string().min(16).max(12_000_000).regex(/^[A-Za-z0-9+/]*={0,2}$/, "Invalid image payload"),
});
export const valuationImagesInputSchema = z.object({
  valuationRef: z.string().regex(/^HM-[A-Z0-9]+-[A-Z0-9]+$/),
  images: z.array(valuationImageInputSchema).max(5),
});

export const valuationInputSchema = z.object({
  customerName: optionalText(160), customerPhone: optionalText(32).transform((value) => value.replace(/[^+\d\s()-]/g, "").slice(0, 32)),
  customerEmail: z.string().optional().default("").transform((value) => sanitizeText(value).toLowerCase()).refine((value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Invalid email"),
  consent: z.boolean(),   purpose: z.enum(["sell", "buy", "invest", "learn"]), city: text(80, 2), district: text(120, 2),
  propertyType: propertyTypeSchema, areaSqm: z.coerce.number().finite().min(20).max(100000),
  ageYears: z.coerce.number().int().min(0).max(150), condition: z.enum(["new", "excellent", "good", "fair", "needs_work"]),
  marketPricePerSqm: z.coerce.number().finite().min(100).max(100000), downPaymentPercent: z.coerce.number().finite().min(0).max(100).optional(),
  annualRatePercent: z.coerce.number().finite().min(0).max(30).optional(), termYears: z.coerce.number().int().min(1).max(40).optional(),
  comparables: z.array(comparableInputSchema).max(20).optional().default([]),
});
export type ValuationInput = z.infer<typeof valuationInputSchema>;
export type ValuationImageInput = z.infer<typeof valuationImageInputSchema>;

export type ComparableSaleInput = ValuationInput["comparables"][number] & { pricePerSqm: number };
export type ValuationResult = { lowPrice: number; highPrice: number; pointPrice: number; confidence: number; factors: Array<{ key: string; label: string; impact: string; detail: string }>; comparables: ComparableSaleInput[] };
export interface ValuationEngine { readonly version: string; calculate(input: ValuationInput): ValuationResult; }

const conditionMultiplier: Record<ValuationInput["condition"], number> = { new: 1.12, excellent: 1.07, good: 1, fair: 0.92, needs_work: 0.82 };
const typeMultiplier: Record<ValuationInput["propertyType"], number> = { apartment: 1, villa: 1.08, land: 0.9, office: 1.04, shop: 1.06, building: 1.1 };

export function sanitizeValuationInput(raw: ValuationInput): ValuationInput {
  if (raw.consent) return raw;
  return { ...raw, customerName: "", customerPhone: "", customerEmail: "" };
}

export const rulesValuationEngine: ValuationEngine = {
  version: "rules-v1",
  calculate(input) {
    const comparablePrices = input.comparables.map((item) => item.price / item.areaSqm).filter(Number.isFinite);
    const compBaseline = comparablePrices.length ? comparablePrices.reduce((sum, value) => sum + value, 0) / comparablePrices.length : input.marketPricePerSqm;
    const marketBaseline = comparablePrices.length ? compBaseline * 0.65 + input.marketPricePerSqm * 0.35 : input.marketPricePerSqm;
    const ageAdjustment = Math.max(0.72, 1 - Math.min(input.ageYears, 70) * 0.004);
    const conditionAdjustment = conditionMultiplier[input.condition];
    const adjustedPerSqm = marketBaseline * typeMultiplier[input.propertyType] * ageAdjustment * conditionAdjustment;
    const pointPrice = Math.round((adjustedPerSqm * input.areaSqm) / 1000) * 1000;
    const spread = Math.max(0.08, 0.18 - Math.min(input.areaSqm, 1000) / 10000);
    const lowPrice = Math.round((pointPrice * (1 - spread)) / 1000) * 1000;
    const highPrice = Math.round((pointPrice * (1 + spread)) / 1000) * 1000;
    const confidence = Math.round(Math.max(58, Math.min(93, 70 + (comparablePrices.length ? Math.min(comparablePrices.length * 4, 16) : 0) + (input.district.length > 4 ? 4 : 0) - Math.min(input.ageYears, 40) * 0.15)));
    return { lowPrice, highPrice, pointPrice, confidence, factors: [
      { key: "location", label: "الموقع", impact: "أساسي", detail: `${input.city} · ${input.district}` },
      { key: "area", label: "المساحة", impact: "مباشر", detail: `${input.areaSqm.toLocaleString("ar-SA")} م²` },
      { key: "condition", label: "الحالة", impact: `${Math.round((conditionAdjustment - 1) * 100)}%`, detail: input.condition },
      { key: "age", label: "العمر", impact: `${Math.round((ageAdjustment - 1) * 100)}%`, detail: `${input.ageYears} سنة` },
      { key: "type", label: "نوع العقار", impact: `${Math.round((typeMultiplier[input.propertyType] - 1) * 100)}%`, detail: input.propertyType },
      { key: "comparables", label: "المقارنات", impact: `${input.comparables.length}`, detail: input.comparables.length ? "مقارنات مدخلة من مصدر معلن" : "لم تُدخل مقارنات موثقة؛ استُخدم سعر السوق المدخل" },
    ], comparables: input.comparables.map((item) => ({ ...item, pricePerSqm: Math.round(item.price / item.areaSqm) })) };
  },
};

export function calculateRulesValuation(input: ValuationInput) { return rulesValuationEngine.calculate(sanitizeValuationInput(input)); }
export function generateValuationRef() { return `HM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`; }
