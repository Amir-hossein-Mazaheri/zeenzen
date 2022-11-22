/*
  Warnings:

  - You are about to drop the column `who_answered_id` on the `ask_amirhossein` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ask_amirhossein" DROP CONSTRAINT "ask_amirhossein_who_answered_id_fkey";

-- AlterTable
ALTER TABLE "ask_amirhossein" DROP COLUMN "who_answered_id";

-- CreateTable
CREATE TABLE "ask_amirhossein_answer" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "who_answered_id" INTEGER NOT NULL,
    "question_id" INTEGER,

    CONSTRAINT "ask_amirhossein_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AskAmirhosseinAnswerToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AskAmirhosseinAnswerToUser_AB_unique" ON "_AskAmirhosseinAnswerToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AskAmirhosseinAnswerToUser_B_index" ON "_AskAmirhosseinAnswerToUser"("B");

-- AddForeignKey
ALTER TABLE "ask_amirhossein_answer" ADD CONSTRAINT "ask_amirhossein_answer_who_answered_id_fkey" FOREIGN KEY ("who_answered_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ask_amirhossein_answer" ADD CONSTRAINT "ask_amirhossein_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "ask_amirhossein"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AskAmirhosseinAnswerToUser" ADD CONSTRAINT "_AskAmirhosseinAnswerToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ask_amirhossein_answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AskAmirhosseinAnswerToUser" ADD CONSTRAINT "_AskAmirhosseinAnswerToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
