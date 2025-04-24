/*
  Warnings:

  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ShopToUser` DROP FOREIGN KEY `_ShopToUser_A_fkey`;

-- DropTable
DROP TABLE `Shop`;

-- CreateTable
CREATE TABLE `shops` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siret` VARCHAR(191) NOT NULL,
    `adresseEtablissement` VARCHAR(191) NOT NULL,
    `denominationUsuelle` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `categorieEntreprise` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `picture` VARCHAR(191) NULL,

    UNIQUE INDEX `shops_siret_key`(`siret`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ShopToUser` ADD CONSTRAINT `_ShopToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `shops`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
