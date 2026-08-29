import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createMarketComparable, createValuationImages, createValuationRecord, getValuationRequestByRef, listMarketComparables, listMatchingMarketComparables } from "./db";
import { storagePut } from "./storage";
import { calculateRulesValuation, generateValuationRef, marketComparableInputSchema, valuationImagesInputSchema, valuationInputSchema } from "./valuation";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { generateContractPdf } from "./contracts/generator";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  valuation: router({
    submit: publicProcedure.input(valuationInputSchema).mutation(async ({ input }) => {
      const storedComparables = await listMatchingMarketComparables(input.city, input.district, input.propertyType);
      const comparables = [...input.comparables, ...storedComparables.map((item) => ({ title: item.title, city: item.city, district: item.district, propertyType: item.propertyType as typeof input.propertyType, areaSqm: Number(item.areaSqm), price: Number(item.price), sourceLabel: item.sourceLabel }))].slice(0, 20);
      const result = calculateRulesValuation({ ...input, comparables });
      const valuationRef = generateValuationRef();
      const saved = await createValuationRecord(valuationRef, input, result);
      return { ...saved, ...result, disclaimer: "هذا تقدير إرشادي مبدئي وليس تقييماً معتمداً أو تقرير مثمن مرخص." };
    }),
  }),
  valuationImages: publicProcedure.input(valuationImagesInputSchema).mutation(async ({ input }) => {
    const request = await getValuationRequestByRef(input.valuationRef);
    if (!request) throw new TRPCError({ code: "NOT_FOUND", message: "Valuation reference not found" });
    if (!request.consent) throw new TRPCError({ code: "FORBIDDEN", message: "Image storage requires consent" });
    const uploaded = [];
    for (const image of input.images) {
      const bytes = Buffer.from(image.dataBase64, "base64");
      if (bytes.length !== image.sizeBytes) throw new TRPCError({ code: "BAD_REQUEST", message: `Image size mismatch: ${image.originalName}` });
      const stored = await storagePut(`valuation-images/${input.valuationRef}/${image.position}-${image.originalName}`, bytes, image.mimeType);
      uploaded.push({ requestId: request.id, storageKey: stored.key, storageUrl: stored.url, originalName: image.originalName, mimeType: image.mimeType, sizeBytes: image.sizeBytes, position: image.position });
    }
    await createValuationImages(uploaded);
    return { uploaded: uploaded.map(({ originalName, storageUrl, position }) => ({ originalName, storageUrl, position })) };
  }),
  contract: router({
    generate: publicProcedure.input(z.object({
      kind: z.enum(["residential", "commercial"]),
      fields: z.record(z.string().max(80), z.union([z.string().max(500), z.number().finite()])).default({}),
    })).mutation(async ({ input }) => {
      const pdf = await generateContractPdf(input.kind, input.fields);
      return { kind: input.kind, fileName: `${input.kind}-contract.pdf`, pdfBase64: pdf.toString("base64") };
    }),
  }),
  comparables: router({
    list: adminProcedure.query(() => listMarketComparables()),
    create: adminProcedure.input(marketComparableInputSchema).mutation(({ input }) => createMarketComparable({ ...input, areaSqm: input.areaSqm.toFixed(2), price: input.price.toFixed(2) })),
  }),
});

export type AppRouter = typeof appRouter;
