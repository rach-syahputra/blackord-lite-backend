/*
  Warnings:

  - Added the required column `songPath` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Song` ADD COLUMN `songPath` VARCHAR(191) NOT NULL;
