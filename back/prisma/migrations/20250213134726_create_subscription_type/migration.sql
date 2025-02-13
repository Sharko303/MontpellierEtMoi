-- CreateTable
CREATE TABLE `subscriptionType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nbPromoCodes` INTEGER NOT NULL,
    `accessToDasboard` BOOLEAN NOT NULL,
    `statistics` BOOLEAN NOT NULL,
    `prioritySupport` BOOLEAN NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
