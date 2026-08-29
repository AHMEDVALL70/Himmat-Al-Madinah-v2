CREATE TABLE `valuation_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requestId` int NOT NULL,
	`storageKey` varchar(255) NOT NULL,
	`storageUrl` varchar(512) NOT NULL,
	`originalName` varchar(160) NOT NULL,
	`mimeType` varchar(80) NOT NULL,
	`sizeBytes` int NOT NULL,
	`position` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `valuation_images_id` PRIMARY KEY(`id`)
);
