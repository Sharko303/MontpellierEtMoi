-- CreateTable
CREATE TABLE `resultats_api` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siret` VARCHAR(191) NOT NULL,
    `adresseEtablissement` VARCHAR(191) NOT NULL,
    `denominationUsuelle` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `categorieEntreprise` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `resultats_api_siret_key`(`siret`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
