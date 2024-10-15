ALTER TABLE `users` ADD `hash` char(64) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `salt` char(32) NOT NULL;