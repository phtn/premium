CREATE TABLE `admin` (
	`userId` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`photoURL` text,
	`active` integer DEFAULT true,
	`master` integer DEFAULT false,
	`verified` integer DEFAULT false,
	`createdBy` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `category` (
	`categoryId` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`photoURL` text,
	`slug` text,
	`active` integer DEFAULT true NOT NULL,
	`liveMode` integer DEFAULT false NOT NULL,
	`remarks` text,
	`createdBy` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`createdBy`) REFERENCES `admin`(`userId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `customer` (
	`customerId` text PRIMARY KEY NOT NULL,
	`defaultDevice` text NOT NULL,
	`defaultPaymentMethodId` text,
	`email` text NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`hasVaultedPaymentMethods` integer NOT NULL,
	`liveMode` integer DEFAULT true,
	`organizationId` text,
	`phone` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orderItem` (
	`orderItemId` text PRIMARY KEY NOT NULL,
	`orderId` text NOT NULL,
	`productId` text NOT NULL,
	`quantity` integer NOT NULL,
	`price` real NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`orderId`) REFERENCES `order`(`orderId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `order` (
	`orderId` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`totalAmount` real NOT NULL,
	`status` text,
	`completed` integer DEFAULT false,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product` (
	`productId` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` real NOT NULL,
	`stock` integer NOT NULL,
	`material` text,
	`photoURLId` text,
	`slug` text,
	`dimensions` text,
	`short` text,
	`categoryId` text NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`liveMode` integer DEFAULT false,
	`remarks` text,
	`createdBy` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`categoryId`) REFERENCES `category`(`categoryId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`createdBy`) REFERENCES `admin`(`userId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`userId` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`photoURL` text,
	`active` integer DEFAULT true NOT NULL,
	`verified` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_email_unique` ON `admin` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);