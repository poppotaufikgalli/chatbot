-- CreateTable
CREATE TABLE `faq` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NULL,
    `keywords` VARCHAR(191) NULL,

    UNIQUE INDEX `faq_question_key`(`question`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_session` (
    `id` VARCHAR(50) NOT NULL,
    `status` ENUM('bot', 'agent') NOT NULL DEFAULT 'bot',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session_id` VARCHAR(50) NOT NULL,
    `sender` ENUM('user', 'bot', 'agent') NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
