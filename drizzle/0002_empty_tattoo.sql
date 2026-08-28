CREATE TABLE `market_comparables` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(160) NOT NULL,
	`city` varchar(80) NOT NULL,
	`district` varchar(120) NOT NULL,
	`propertyType` varchar(40) NOT NULL,
	`areaSqm` decimal(12,2) NOT NULL,
	`ageYears` int NOT NULL,
	`condition` varchar(32) NOT NULL,
	`price` decimal(16,2) NOT NULL,
	`saleDate` date NOT NULL,
	`sourceLabel` varchar(160) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `market_comparables_id` PRIMARY KEY(`id`)
);
