/*
  Warnings:

  - Added the required column `fullName` to the `question_hub_question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "question_hub_question" ADD COLUMN     "fullName" VARCHAR(255) NOT NULL;
