-- DropIndex
DROP INDEX `User_refreshToken_key` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `refreshToken` VARCHAR(255) NOT NULL DEFAULT '';
