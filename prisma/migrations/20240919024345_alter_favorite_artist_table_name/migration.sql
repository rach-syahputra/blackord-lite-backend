/*
  Warnings:

  - You are about to drop the `favoriteartist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `favoriteartist` DROP FOREIGN KEY `FavoriteArtist_artistUsername_fkey`;

-- DropForeignKey
ALTER TABLE `favoriteartist` DROP FOREIGN KEY `FavoriteArtist_listenerUsername_fkey`;

-- DropTable
DROP TABLE `favoriteartist`;

-- CreateTable
CREATE TABLE `favorite_artist` (
    `listenerUsername` VARCHAR(191) NOT NULL,
    `artistUsername` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`listenerUsername`, `artistUsername`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favorite_artist` ADD CONSTRAINT `favorite_artist_listenerUsername_fkey` FOREIGN KEY (`listenerUsername`) REFERENCES `Listener`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite_artist` ADD CONSTRAINT `favorite_artist_artistUsername_fkey` FOREIGN KEY (`artistUsername`) REFERENCES `Artist`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
