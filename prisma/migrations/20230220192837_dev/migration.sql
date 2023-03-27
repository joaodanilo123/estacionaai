/*
  Warnings:

  - You are about to drop the `vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `vehicle`;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `licensePlate` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
