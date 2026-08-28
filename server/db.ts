import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, marketComparables, InsertMarketComparable, users, valuationComparables, valuationRequests, valuationResults } from "../drizzle/schema";
import { ENV } from "./_core/env";
import type { ValuationInput, ValuationResult } from "./valuation";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  }
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  } else {
    values.lastSignedIn = new Date();
    updateSet.lastSignedIn = new Date();
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function listMatchingMarketComparables(city: string, district: string, propertyType: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  return db.select().from(marketComparables).where(and(eq(marketComparables.city, city), eq(marketComparables.district, district), eq(marketComparables.propertyType, propertyType))).orderBy(desc(marketComparables.saleDate)).limit(20);
}

export async function listMarketComparables(limit = 100) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  return db.select().from(marketComparables).orderBy(desc(marketComparables.saleDate)).limit(limit);
}

export async function createMarketComparable(input: InsertMarketComparable) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  const inserted = await db.insert(marketComparables).values(input);
  return { id: Number(inserted[0].insertId), ...input };
}

export async function createValuationRecord(ref: string, input: ValuationInput, result: ValuationResult) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  const requestInsert = await db.insert(valuationRequests).values({
    valuationRef: ref,
    customerName: input.customerName || null,
    customerPhone: input.customerPhone || null,
    customerEmail: input.customerEmail || null,
    consent: input.consent,
    purpose: input.purpose,
    city: input.city,
    district: input.district,
    propertyType: input.propertyType,
    areaSqm: input.areaSqm.toFixed(2),
    ageYears: input.ageYears,
    condition: input.condition,
    marketPricePerSqm: input.marketPricePerSqm.toFixed(2),
    downPaymentPercent: input.downPaymentPercent?.toFixed(2),
    annualRatePercent: input.annualRatePercent?.toFixed(2),
    termYears: input.termYears,
  });
  const requestId = Number(requestInsert[0].insertId);
  await db.insert(valuationResults).values({
    requestId,
    lowPrice: result.lowPrice.toFixed(2),
    highPrice: result.highPrice.toFixed(2),
    pointPrice: result.pointPrice.toFixed(2),
    confidence: result.confidence,
    factors: result.factors,
    engineVersion: "rules-v1",
  });
  if (result.comparables.length > 0) {
    await db.insert(valuationComparables).values(result.comparables.map((comparable) => ({
      requestId,
      title: comparable.title,
      city: comparable.city,
      district: comparable.district,
      propertyType: comparable.propertyType,
      areaSqm: comparable.areaSqm.toFixed(2),
      price: comparable.price.toFixed(2),
      pricePerSqm: comparable.pricePerSqm.toFixed(2),
      sourceLabel: comparable.sourceLabel,
    })));
  }
  return { requestId, valuationRef: ref };
}
