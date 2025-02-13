/*
  Warnings:

  - The primary key for the `codes_promo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `codes_promo` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `codes_promo_code_key` ON `codes_promo`;

-- AlterTable
ALTER TABLE `codes_promo` DROP PRIMARY KEY,
    DROP COLUMN `code`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
