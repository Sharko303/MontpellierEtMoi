/*
  Warnings:

  - You are about to drop the column `actif` on the `contrats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contrats` DROP COLUMN `actif`,
    ADD COLUMN `autoRenew` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `user_resultats_api` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `apiResult` INTEGER NOT NULL,

    INDEX `user_resultats_api_userId_fkey`(`userId`),
    INDEX `user_resultats_api_apiResult_fkey`(`apiResult`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_resultats_api` ADD CONSTRAINT `user_resultats_api_apiResult_fkey` FOREIGN KEY (`apiResult`) REFERENCES `resultats_api`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_resultats_api` ADD CONSTRAINT `user_resultats_api_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
