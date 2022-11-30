/*
  Warnings:

  - You are about to alter the column `tags` on the `stack_overflow_question` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "stack_overflow_question" ALTER COLUMN "tags" SET DATA TYPE VARCHAR(255)[];
