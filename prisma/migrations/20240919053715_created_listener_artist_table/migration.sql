-- CreateTable
CREATE TABLE `listener_artist` (
    `listenerUsername` VARCHAR(191) NOT NULL,
    `artistUsername` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`listenerUsername`, `artistUsername`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `listener_artist` ADD CONSTRAINT `listener_artist_listenerUsername_fkey` FOREIGN KEY (`listenerUsername`) REFERENCES `Listener`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `listener_artist` ADD CONSTRAINT `listener_artist_artistUsername_fkey` FOREIGN KEY (`artistUsername`) REFERENCES `Artist`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
