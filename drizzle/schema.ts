import { date, int, json, mysqlEnum, mysqlTable, timestamp, varchar, decimal, boolean, text } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const marketComparables = mysqlTable("market_comparables", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 160 }).notNull(),
  city: varchar("city", { length: 80 }).notNull(),
  district: varchar("district", { length: 120 }).notNull(),
  propertyType: varchar("propertyType", { length: 40 }).notNull(),
  areaSqm: decimal("areaSqm", { precision: 12, scale: 2 }).notNull(),
  ageYears: int("ageYears").notNull(),
  condition: varchar("condition", { length: 32 }).notNull(),
  price: decimal("price", { precision: 16, scale: 2 }).notNull(),
  saleDate: date("saleDate", { mode: "string" }).notNull(),
  sourceLabel: varchar("sourceLabel", { length: 160 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const valuationRequests = mysqlTable("valuation_requests", {
  id: int("id").autoincrement().primaryKey(),
  valuationRef: varchar("valuationRef", { length: 32 }).notNull().unique(),
  customerName: varchar("customerName", { length: 160 }),
  customerPhone: varchar("customerPhone", { length: 32 }),
  customerEmail: varchar("customerEmail", { length: 320 }),
  consent: boolean("consent").notNull(),
  purpose: varchar("purpose", { length: 32 }).notNull(),
  city: varchar("city", { length: 80 }).notNull(),
  district: varchar("district", { length: 120 }).notNull(),
  propertyType: varchar("propertyType", { length: 40 }).notNull(),
  areaSqm: decimal("areaSqm", { precision: 12, scale: 2 }).notNull(),
  ageYears: int("ageYears").notNull(),
  condition: varchar("condition", { length: 32 }).notNull(),
  marketPricePerSqm: decimal("marketPricePerSqm", { precision: 12, scale: 2 }).notNull(),
  downPaymentPercent: decimal("downPaymentPercent", { precision: 5, scale: 2 }),
  annualRatePercent: decimal("annualRatePercent", { precision: 5, scale: 2 }),
  termYears: int("termYears"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const valuationResults = mysqlTable("valuation_results", {
  id: int("id").autoincrement().primaryKey(),
  requestId: int("requestId").notNull(),
  lowPrice: decimal("lowPrice", { precision: 16, scale: 2 }).notNull(),
  highPrice: decimal("highPrice", { precision: 16, scale: 2 }).notNull(),
  pointPrice: decimal("pointPrice", { precision: 16, scale: 2 }).notNull(),
  confidence: int("confidence").notNull(),
  factors: json("factors").notNull(),
  engineVersion: varchar("engineVersion", { length: 32 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const valuationComparables = mysqlTable("valuation_comparables", {
  id: int("id").autoincrement().primaryKey(),
  requestId: int("requestId").notNull(),
  title: varchar("title", { length: 160 }).notNull(),
  city: varchar("city", { length: 80 }).notNull(),
  district: varchar("district", { length: 120 }).notNull(),
  propertyType: varchar("propertyType", { length: 40 }).notNull(),
  areaSqm: decimal("areaSqm", { precision: 12, scale: 2 }).notNull(),
  price: decimal("price", { precision: 16, scale: 2 }).notNull(),
  pricePerSqm: decimal("pricePerSqm", { precision: 12, scale: 2 }).notNull(),
  sourceLabel: varchar("sourceLabel", { length: 160 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type ValuationRequest = typeof valuationRequests.$inferSelect;
export type InsertValuationRequest = typeof valuationRequests.$inferInsert;
export type ValuationResult = typeof valuationResults.$inferSelect;
export type ValuationComparable = typeof valuationComparables.$inferSelect;
export type MarketComparable = typeof marketComparables.$inferSelect;
export type InsertMarketComparable = typeof marketComparables.$inferInsert;
