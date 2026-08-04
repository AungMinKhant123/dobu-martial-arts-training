-- AlterTable
ALTER TABLE `Enquiry` ADD COLUMN `repliedAt` DATETIME(3) NULL,
    ADD COLUMN `repliedById` VARCHAR(191) NULL,
    ADD COLUMN `replyMessage` TEXT NULL,
    ADD COLUMN `replySubject` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Enquiry` ADD CONSTRAINT `Enquiry_repliedById_fkey` FOREIGN KEY (`repliedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
