-- AlterTable
ALTER TABLE `penjual` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `isOpen` BOOLEAN NOT NULL DEFAULT false;
