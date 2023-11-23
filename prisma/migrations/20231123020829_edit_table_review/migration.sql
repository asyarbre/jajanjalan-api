/*
  Warnings:

  - Made the column `rating` on table `review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `review` MODIFY `rating` DECIMAL(2, 1) NOT NULL;
