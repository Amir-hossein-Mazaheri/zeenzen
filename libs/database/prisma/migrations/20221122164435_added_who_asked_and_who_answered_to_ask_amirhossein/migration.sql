/*
  Warnings:

  - You are about to drop the column `user_id` on the `ask_amirhossein` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ask_amirhossein" DROP CONSTRAINT "ask_amirhossein_user_id_fkey";

-- AlterTable
ALTER TABLE "ask_amirhossein" DROP COLUMN "user_id",
ADD COLUMN     "who_answered_id" INTEGER,
ADD COLUMN     "who_asked_id" INTEGER;

-- AddForeignKey
ALTER TABLE "ask_amirhossein" ADD CONSTRAINT "ask_amirhossein_who_asked_id_fkey" FOREIGN KEY ("who_asked_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ask_amirhossein" ADD CONSTRAINT "ask_amirhossein_who_answered_id_fkey" FOREIGN KEY ("who_answered_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
