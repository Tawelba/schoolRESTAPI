-- CreateTable
CREATE TABLE `schools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` ENUM('BASIC', 'SHS') NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `regd_no` VARCHAR(255) NULL,
    `motto` VARCHAR(255) NULL,
    `address` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(255) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `schools_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `programmes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NULL,

    UNIQUE INDEX `programmes_id_key`(`id`),
    UNIQUE INDEX `programmes_name_key`(`name`),
    UNIQUE INDEX `programmes_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `short_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `grades_id_key`(`id`),
    UNIQUE INDEX `grades_name_key`(`name`),
    UNIQUE INDEX `grades_short_name_key`(`short_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `admission_id` VARCHAR(191) NOT NULL,
    `admission_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `firstname` VARCHAR(255) NOT NULL,
    `othernames` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(1) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `account_id` INTEGER NULL,
    `image` VARCHAR(255) NULL,
    `school_id` INTEGER NOT NULL,
    `programme_id` INTEGER NULL,
    `grade_id` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `students_admission_id_key`(`admission_id`),
    UNIQUE INDEX `students_account_id_key`(`account_id`),
    PRIMARY KEY (`admission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guardians` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NOT NULL,
    `othernames` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(1) NOT NULL,
    `relation` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `account_id` INTEGER NULL,

    UNIQUE INDEX `guardians_account_id_key`(`account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentGuardians` (
    `student_id` VARCHAR(191) NOT NULL,
    `guardian_id` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assigned_by` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`student_id`, `guardian_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `schools`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_programme_id_fkey` FOREIGN KEY (`programme_id`) REFERENCES `programmes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_grade_id_fkey` FOREIGN KEY (`grade_id`) REFERENCES `grades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guardians` ADD CONSTRAINT `guardians_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentGuardians` ADD CONSTRAINT `StudentGuardians_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`admission_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentGuardians` ADD CONSTRAINT `StudentGuardians_guardian_id_fkey` FOREIGN KEY (`guardian_id`) REFERENCES `guardians`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
