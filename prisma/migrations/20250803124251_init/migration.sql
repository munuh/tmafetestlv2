-- CreateTable
CREATE TABLE `Owner` (
    `id` INTEGER NOT NULL,
    `owner_name` VARCHAR(225) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `product_id` INTEGER NOT NULL,
    `product_name` VARCHAR(85) NULL,
    `product_brand` VARCHAR(45) NULL,
    `created_date` VARCHAR(45) NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products_owners` (
    `products_id` INTEGER NOT NULL,
    `owners_id` VARCHAR(45) NULL,

    PRIMARY KEY (`products_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
