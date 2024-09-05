CREATE TABLE `admin` (
	`userId` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`photoURL` text,
	`active` integer DEFAULT true NOT NULL,
	`master` integer DEFAULT false NOT NULL,
	`verified` integer DEFAULT false NOT NULL,
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
	`active` integer DEFAULT true NOT NULL,
	`liveMode` integer DEFAULT false NOT NULL,
	`remarks` text,
	`createdBy` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`createdBy`) REFERENCES `admin`(`userId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `customerPaymentMethod` (
	`id` text PRIMARY KEY NOT NULL,
	`customerId` text NOT NULL,
	`liveMode` integer DEFAULT true,
	`organizationId` text NOT NULL,
	`paymentMethodId` text NOT NULL,
	`paymentMethodType` text NOT NULL,
	`sessionType` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`customerId`) REFERENCES `customer`(`customerId`) ON UPDATE no action ON DELETE no action
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
CREATE TABLE `guestCheckoutLineItem` (
	`lineItemId` text PRIMARY KEY NOT NULL,
	`checkoutId` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text,
	`description` text,
	`name` text NOT NULL,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`checkoutId`) REFERENCES `guestCheckout`(`checkoutId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `guestCheckout` (
	`checkoutId` text PRIMARY KEY NOT NULL,
	`billingName` text,
	`billingEmail` text,
	`billingPhone` text,
	`billingLine1` text,
	`billingLine2` text,
	`billingCity` text,
	`billingState` text,
	`billingPostalCode` text,
	`billingCountry` text,
	`cancelUrl` text,
	`checkoutUrl` text NOT NULL,
	`clientKey` text NOT NULL,
	`description` text,
	`liveMode` integer,
	`merchant` text NOT NULL,
	`paymentIntentId` text,
	`paymentMethodTypes` text NOT NULL,
	`referenceNumber` text NOT NULL,
	`sendEmailReceipt` integer DEFAULT true,
	`showDescription` integer DEFAULT true,
	`showLineItems` integer DEFAULT true,
	`status` text NOT NULL,
	`successUrl` text,
	`metadata` text,
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
	FOREIGN KEY (`orderId`) REFERENCES `order`(`orderId`) ON UPDATE no action ON DELETE no action
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
CREATE TABLE `product` (
	`productId` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` real NOT NULL,
	`stock` integer NOT NULL,
	`photoURLId` text,
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
--> statement-breakpoint
/*
 SQLite does not support "Set not null to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
/*
 SQLite does not support "Changing existing column type" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
CREATE UNIQUE INDEX `admin_email_unique` ON `admin` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);