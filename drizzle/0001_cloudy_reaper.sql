CREATE TABLE `valuation_comparables` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requestId` int NOT NULL,
	`title` varchar(160) NOT NULL,
	`city` varchar(80) NOT NULL,
	`district` varchar(120) NOT NULL,
	`propertyType` varchar(40) NOT NULL,
	`areaSqm` decimal(12,2) NOT NULL,
	`price` decimal(16,2) NOT NULL,
	`pricePerSqm` decimal(12,2) NOT NULL,
	`sourceLabel` varchar(160) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `valuation_comparables_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `valuation_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`valuationRef` varchar(32) NOT NULL,
	`customerName` varchar(160),
	`customerPhone` varchar(32),
	`customerEmail` varchar(320),
	`consent` boolean NOT NULL,
	`purpose` varchar(32) NOT NULL,
	`city` varchar(80) NOT NULL,
	`district` varchar(120) NOT NULL,
	`propertyType` varchar(40) NOT NULL,
	`areaSqm` decimal(12,2) NOT NULL,
	`ageYears` int NOT NULL,
	`condition` varchar(32) NOT NULL,
	`marketPricePerSqm` decimal(12,2) NOT NULL,
	`downPaymentPercent` decimal(5,2),
	`annualRatePercent` decimal(5,2),
	`termYears` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `valuation_requests_id` PRIMARY KEY(`id`),
	CONSTRAINT `valuation_requests_valuationRef_unique` UNIQUE(`valuationRef`)
);
--> statement-breakpoint
CREATE TABLE `valuation_results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requestId` int NOT NULL,
	`lowPrice` decimal(16,2) NOT NULL,
	`highPrice` decimal(16,2) NOT NULL,
	`pointPrice` decimal(16,2) NOT NULL,
	`confidence` int NOT NULL,
	`factors` json NOT NULL,
	`engineVersion` varchar(32) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `valuation_results_id` PRIMARY KEY(`id`)
);
