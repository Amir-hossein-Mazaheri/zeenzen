/*
  Warnings:

  - You are about to drop the column `created_aut` on the `question_hub_question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "question_hub_question" DROP COLUMN "created_aut",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
