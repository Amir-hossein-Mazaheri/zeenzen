/*
  Warnings:

  - A unique constraint covering the columns `[question_hub_id]` on the table `course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `question_hub_id` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course" ADD COLUMN     "question_hub_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "question_hub" (
    "id" TEXT NOT NULL,

    CONSTRAINT "question_hub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_hub_question" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "created_aut" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hub_id" TEXT NOT NULL,

    CONSTRAINT "question_hub_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_hub_answer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "question_id" INTEGER,
    "who_answered_id" INTEGER NOT NULL,

    CONSTRAINT "question_hub_answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "course_question_hub_id_key" ON "course"("question_hub_id");

-- AddForeignKey
ALTER TABLE "question_hub_question" ADD CONSTRAINT "question_hub_question_hub_id_fkey" FOREIGN KEY ("hub_id") REFERENCES "question_hub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_hub_answer" ADD CONSTRAINT "question_hub_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question_hub_question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_hub_answer" ADD CONSTRAINT "question_hub_answer_who_answered_id_fkey" FOREIGN KEY ("who_answered_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_question_hub_id_fkey" FOREIGN KEY ("question_hub_id") REFERENCES "question_hub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
