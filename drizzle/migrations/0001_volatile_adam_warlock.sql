CREATE TABLE `category` (
	`categoryId` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `customerPaymentMethod` (
	`id` text PRIMARY KEY NOT NULL,
	`customerId` text NOT NULL,
	`liveMode` integer NOT NULL,
	`organizationId` text NOT NULL,
	`paymentMethodId` text NOT NULL,
	`paymentMethodType` text NOT NULL,
	`sessionType` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
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
	`liveMode` integer NOT NULL,
	`organizationId` text,
	`phone` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `featuredItem` (
	`productId` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` real NOT NULL,
	`stock` integer NOT NULL,
	`categoryId` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`categoryId`) REFERENCES `category`(`categoryId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `guestCheckoutLineItem` (
	`lineItemId` text PRIMARY KEY NOT NULL,
	`checkoutId` text NOT NULL,
	`amount` integer NOT NULL,
	`currency` text NOT NULL,
	`description` text NOT NULL,
	`name` text NOT NULL,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`checkoutId`) REFERENCES `guestCheckout`(`checkoutId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `guestCheckout` (
	`checkoutId` text PRIMARY KEY NOT NULL,
	`billingName` text NOT NULL,
	`billingEmail` text NOT NULL,
	`billingPhone` text NOT NULL,
	`billingLine1` text NOT NULL,
	`billingLine2` text,
	`billingCity` text NOT NULL,
	`billingState` text NOT NULL,
	`billingPostalCode` text NOT NULL,
	`billingCountry` text NOT NULL,
	`cancelUrl` text NOT NULL,
	`checkoutUrl` text NOT NULL,
	`clientKey` text NOT NULL,
	`description` text,
	`liveMode` integer NOT NULL,
	`merchant` text NOT NULL,
	`paymentIntentId` text,
	`paymentMethodTypes` text NOT NULL,
	`referenceNumber` text NOT NULL,
	`sendEmailReceipt` integer NOT NULL,
	`showDescription` integer NOT NULL,
	`showLineItems` integer NOT NULL,
	`status` text NOT NULL,
	`successUrl` text NOT NULL,
	`metadata` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orderItem` (
	`orderItemId` text PRIMARY KEY NOT NULL,
	`orderId` text NOT NULL,
	`productId` text NOT NULL,
	`quantity` integer NOT NULL,
	`price` real NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`orderId`) REFERENCES `order`(`orderId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `order` (
	`orderId` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`totalAmount` real NOT NULL,
	`status` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product` (
	`productId` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` real NOT NULL,
	`stock` integer NOT NULL,
	`categoryId` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `review` (
	`reviewId` text PRIMARY KEY NOT NULL,
	`productId` text NOT NULL,
	`userId` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
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
*/