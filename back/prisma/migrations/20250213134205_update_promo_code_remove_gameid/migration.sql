/*
  Warnings:

  - You are about to drop the column `gameId` on the `codes_promo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `codes_promo` DROP FOREIGN KEY `codes_promo_gameId_fkey`;

-- DropIndex
DROP INDEX `codes_promo_gameId_fkey` ON `codes_promo`;

-- AlterTable
ALTER TABLE `codes_promo` DROP COLUMN `gameId`;
