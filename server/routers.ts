import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createMarketComparable, createValuationRecord, listMarketComparables, listMatchingMarketComparables } from "./db";
import { calculateRulesValuation, generateValuationRef, marketComparableInputSchema, valuationInputSchema } from "./valuation";

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
  comparables: router({
    list: adminProcedure.query(() => listMarketComparables()),
    create: adminProcedure.input(marketComparableInputSchema).mutation(({ input }) => createMarketComparable({ ...input, areaSqm: input.areaSqm.toFixed(2), price: input.price.toFixed(2) })),
  }),
});

export type AppRouter = typeof appRouter;
