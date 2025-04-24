/*
  Warnings:

  - You are about to drop the `user_resultats_api` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_resultats_api` DROP FOREIGN KEY `user_resultats_api_apiResult_fkey`;

-- DropForeignKey
ALTER TABLE `user_resultats_api` DROP FOREIGN KEY `user_resultats_api_userId_fkey`;

-- DropTable
DROP TABLE `user_resultats_api`;

-- CreateTable
CREATE TABLE `_ShopToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ShopToUser_AB_unique`(`A`, `B`),
    INDEX `_ShopToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ShopToUser` ADD CONSTRAINT `_ShopToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `resultats_api`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ShopToUser` ADD CONSTRAINT `_ShopToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
