/*
  Warnings:

  - Added the required column `merchantId` to the `codes_promo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `codes_promo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `codes_promo` ADD COLUMN `merchantId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `codes_promo_merchantId_fkey` ON `codes_promo`(`merchantId`);

-- CreateIndex
CREATE INDEX `codes_promo_userId_fkey` ON `codes_promo`(`userId`);

-- AddForeignKey
ALTER TABLE `codes_promo` ADD CONSTRAINT `codes_promo_merchantId_fkey` FOREIGN KEY (`merchantId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `codes_promo` ADD CONSTRAINT `codes_promo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
