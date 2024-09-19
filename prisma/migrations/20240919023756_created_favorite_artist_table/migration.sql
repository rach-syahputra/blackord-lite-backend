-- CreateTable
CREATE TABLE `FavoriteArtist` (
    `listenerUsername` VARCHAR(191) NOT NULL,
    `artistUsername` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`listenerUsername`, `artistUsername`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FavoriteArtist` ADD CONSTRAINT `FavoriteArtist_listenerUsername_fkey` FOREIGN KEY (`listenerUsername`) REFERENCES `Listener`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteArtist` ADD CONSTRAINT `FavoriteArtist_artistUsername_fkey` FOREIGN KEY (`artistUsername`) REFERENCES `Artist`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
