/*
  Warnings:

  - You are about to drop the column `type` on the `contrats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contrats` DROP COLUMN `type`,
    ADD COLUMN `typeId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `contrats` ADD CONSTRAINT `contrats_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `subscriptionType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
