/*
  Warnings:

  - Added the required column `penjualId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `rating` on table `review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `review` ADD COLUMN `penjualId` INTEGER NOT NULL,
    MODIFY `rating` DECIMAL(2, 1) NOT NULL;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_penjualId_fkey` FOREIGN KEY (`penjualId`) REFERENCES `Penjual`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
