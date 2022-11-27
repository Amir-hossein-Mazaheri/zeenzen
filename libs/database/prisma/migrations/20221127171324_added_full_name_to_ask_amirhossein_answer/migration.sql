/*
  Warnings:

  - You are about to drop the column `answered_at` on the `ask_amirhossein` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ask_amirhossein" DROP COLUMN "answered_at";

-- AlterTable
ALTER TABLE "ask_amirhossein_answer" ADD COLUMN     "fullName" VARCHAR(255) NOT NULL DEFAULT 'ممد اکبری';
