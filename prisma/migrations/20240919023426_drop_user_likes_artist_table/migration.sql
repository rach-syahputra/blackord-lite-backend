/*
  Warnings:

  - You are about to drop the `listenerlikesartist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `listenerlikesartist` DROP FOREIGN KEY `ListenerLikesArtist_artistUsername_fkey`;

-- DropForeignKey
ALTER TABLE `listenerlikesartist` DROP FOREIGN KEY `ListenerLikesArtist_listenerUsername_fkey`;

-- DropTable
DROP TABLE `listenerlikesartist`;
