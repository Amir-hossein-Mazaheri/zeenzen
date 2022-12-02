/*
  Warnings:

  - Added the required column `who_asked_id` to the `question_hub_question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "question_hub_question" ADD COLUMN     "who_asked_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "question_hub_question" ADD CONSTRAINT "question_hub_question_who_asked_id_fkey" FOREIGN KEY ("who_asked_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
