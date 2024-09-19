/*
  Warnings:

  - You are about to drop the `favorite_artist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `favorite_artist` DROP FOREIGN KEY `favorite_artist_artistUsername_fkey`;

-- DropForeignKey
ALTER TABLE `favorite_artist` DROP FOREIGN KEY `favorite_artist_listenerUsername_fkey`;

-- DropTable
DROP TABLE `favorite_artist`;
