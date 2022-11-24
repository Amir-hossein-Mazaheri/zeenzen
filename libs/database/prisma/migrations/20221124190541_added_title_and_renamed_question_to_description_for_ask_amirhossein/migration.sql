/*
  Warnings:

  - You are about to drop the column `answer` on the `ask_amirhossein` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `ask_amirhossein` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ask_amirhossein" DROP COLUMN "answer",
DROP COLUMN "question",
ADD COLUMN     "description" VARCHAR(1000) NOT NULL DEFAULT 'تست توضیحات سوال',
ADD COLUMN     "title" VARCHAR(255) NOT NULL DEFAULT 'چرا Js اینقدر عالیه؟';
