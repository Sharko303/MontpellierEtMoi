/*
  Warnings:

  - You are about to drop the column `isUsed` on the `codes_promo` table. All the data in the column will be lost.
  - You are about to drop the column `validUntil` on the `codes_promo` table. All the data in the column will be lost.
  - Added the required column `expiration` to the `codes_promo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `codes_promo` DROP COLUMN `isUsed`,
    DROP COLUMN `validUntil`,
    ADD COLUMN `expiration` DATETIME(3) NOT NULL,
    ADD COLUMN `valid` BOOLEAN NOT NULL DEFAULT false;
