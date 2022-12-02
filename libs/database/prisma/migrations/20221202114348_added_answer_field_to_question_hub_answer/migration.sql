/*
  Warnings:

  - Added the required column `answer` to the `question_hub_answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "question_hub_answer" ADD COLUMN     "answer" TEXT NOT NULL;
