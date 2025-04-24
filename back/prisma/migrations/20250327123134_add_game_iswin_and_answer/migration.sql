/*
  Warnings:

  - Added the required column `answer` to the `jeux` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jeux` ADD COLUMN `answer` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_jeux` ADD COLUMN `isWin` BOOLEAN NOT NULL DEFAULT false;
