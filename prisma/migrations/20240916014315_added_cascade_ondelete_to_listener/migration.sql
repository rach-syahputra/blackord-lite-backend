-- DropForeignKey
ALTER TABLE `listener` DROP FOREIGN KEY `Listener_username_fkey`;

-- AddForeignKey
ALTER TABLE `Listener` ADD CONSTRAINT `Listener_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
