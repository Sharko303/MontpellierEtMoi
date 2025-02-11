/*
  Warnings:

  - You are about to drop the column `merchantId` on the `contrats` table. All the data in the column will be lost.
  - You are about to drop the column `merchantId` on the `jeux` table. All the data in the column will be lost.
  - You are about to drop the `commercants` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `contrats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `contrats` DROP FOREIGN KEY `contrats_merchantId_fkey`;

-- DropForeignKey
ALTER TABLE `jeux` DROP FOREIGN KEY `jeux_merchantId_fkey`;

-- DropIndex
DROP INDEX `contrats_merchantId_fkey` ON `contrats`;

-- DropIndex
DROP INDEX `jeux_merchantId_fkey` ON `jeux`;

-- AlterTable
ALTER TABLE `contrats` DROP COLUMN `merchantId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `jeux` DROP COLUMN `merchantId`;

-- DropTable
DROP TABLE `commercants`;

-- CreateIndex
CREATE INDEX `contrats_merchantId_fkey` ON `contrats`(`userId`);

-- AddForeignKey
ALTER TABLE `contrats` ADD CONSTRAINT `contrats_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
