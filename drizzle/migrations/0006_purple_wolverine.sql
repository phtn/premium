CREATE TABLE `featuredItem` (
	`productId` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` real NOT NULL,
	`stock` integer NOT NULL,
	`categoryId` text NOT NULL,
	`liveMode` integer DEFAULT false,
	`createdBy` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`categoryId`) REFERENCES `category`(`categoryId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`createdBy`) REFERENCES `admin`(`userId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `productImage` (
	`imageId` text PRIMARY KEY NOT NULL,
	`productId` text NOT NULL,
	`url` text NOT NULL,
	`description` text,
	`createdBy` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `review` (
	`reviewId` text PRIMARY KEY NOT NULL,
	`productId` text NOT NULL,
	`userId` text NOT NULL,
	`rating` integer,
	`comment` text,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON UPDATE no action ON DELETE no action
);
