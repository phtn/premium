CREATE TABLE `user` (
	`userId` text NOT NULL,
	`name` text,
	`email` text,
	`phone` text,
	`photoURL` text,
	`active` integer DEFAULT true NOT NULL,
	`verified` integer DEFAULT false NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
