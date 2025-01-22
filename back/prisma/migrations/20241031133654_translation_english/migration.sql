/*
  Warnings:

  - You are about to drop the column `etablissement_id` on the `codes_promo` table. All the data in the column will be lost.
  - You are about to drop the column `jeux_id` on the `codes_promo` table. All the data in the column will be lost.
  - You are about to drop the column `valid_until` on the `codes_promo` table. All the data in the column will be lost.
  - You are about to drop the column `business_name` on the `commercants` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `commercants` table. All the data in the column will be lost.
  - You are about to drop the column `commercant_id` on the `contrats` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `contrats` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `contrats` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `contrats` table. All the data in the column will be lost.
  - You are about to drop the column `commercant_id` on the `jeux` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `jeux` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `jeux` table. All the data in the column will be lost.
  - You are about to drop the column `jeux_id` on the `user_jeux` table. All the data in the column will be lost.
  - You are about to drop the column `participation_date` on the `user_jeux` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_jeux` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_type` on the `users` table. All the data in the column will be lost.
  - Added the required column `establishmentId` to the `codes_promo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `codes_promo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validUntil` to the `codes_promo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `commercants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `commercants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `contrats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantId` to the `contrats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `contrats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `jeux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantId` to the `jeux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `jeux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `user_jeux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user_jeux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `codes_promo` DROP FOREIGN KEY `codes_promo_jeux_id_fkey`;

-- DropForeignKey
ALTER TABLE `contrats` DROP FOREIGN KEY `contrats_commercant_id_fkey`;

-- DropForeignKey
ALTER TABLE `jeux` DROP FOREIGN KEY `jeux_commercant_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_jeux` DROP FOREIGN KEY `user_jeux_jeux_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_jeux` DROP FOREIGN KEY `user_jeux_user_id_fkey`;

-- AlterTable
ALTER TABLE `codes_promo` DROP COLUMN `etablissement_id`,
    DROP COLUMN `jeux_id`,
    DROP COLUMN `valid_until`,
    ADD COLUMN `establishmentId` INTEGER NOT NULL,
    ADD COLUMN `gameId` INTEGER NOT NULL,
    ADD COLUMN `validUntil` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `commercants` DROP COLUMN `business_name`,
    DROP COLUMN `user_id`,
    ADD COLUMN `businessName` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `contrats` DROP COLUMN `commercant_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `end_date`,
    DROP COLUMN `start_date`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `merchantId` INTEGER NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `jeux` DROP COLUMN `commercant_id`,
    DROP COLUMN `end_date`,
    DROP COLUMN `start_date`,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `merchantId` INTEGER NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user_jeux` DROP COLUMN `jeux_id`,
    DROP COLUMN `participation_date`,
    DROP COLUMN `user_id`,
    ADD COLUMN `gameId` INTEGER NOT NULL,
    ADD COLUMN `participationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `created_at`,
    DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    DROP COLUMN `phone_number`,
    DROP COLUMN `user_type`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `userType` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `contrats` ADD CONSTRAINT `contrats_merchantId_fkey` FOREIGN KEY (`merchantId`) REFERENCES `commercants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jeux` ADD CONSTRAINT `jeux_merchantId_fkey` FOREIGN KEY (`merchantId`) REFERENCES `commercants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_jeux` ADD CONSTRAINT `user_jeux_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_jeux` ADD CONSTRAINT `user_jeux_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `jeux`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `codes_promo` ADD CONSTRAINT `codes_promo_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `jeux`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
