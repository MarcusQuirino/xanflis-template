CREATE TABLE `xanflis-template_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `xanflis-template_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `xanflis-template_user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`clerk_id` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `xanflis-template_user_clerk_id_unique` ON `xanflis-template_user` (`clerk_id`);--> statement-breakpoint
CREATE INDEX `clerk_id_idx` ON `xanflis-template_user` (`clerk_id`);