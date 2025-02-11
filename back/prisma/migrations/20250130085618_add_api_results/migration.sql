/*
  Warnings:

  - You are about to drop the column `isUsed` on the `codes_promo` table. All the data in the column will be lost.
  - You are about to drop the `resultats_api` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `codes_promo` DROP COLUMN `isUsed`;

-- DropTable
DROP TABLE `resultats_api`;
