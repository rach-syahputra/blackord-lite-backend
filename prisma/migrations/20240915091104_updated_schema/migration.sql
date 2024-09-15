/*
  Warnings:

  - Added the required column `image` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `album` DROP FOREIGN KEY `Album_artistUsername_fkey`;

-- DropForeignKey
ALTER TABLE `artist` DROP FOREIGN KEY `Artist_username_fkey`;

-- DropForeignKey
ALTER TABLE `song` DROP FOREIGN KEY `Song_albumId_fkey`;

-- AlterTable
ALTER TABLE `album` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Artist` ADD CONSTRAINT `Artist_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_artistUsername_fkey` FOREIGN KEY (`artistUsername`) REFERENCES `Artist`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
