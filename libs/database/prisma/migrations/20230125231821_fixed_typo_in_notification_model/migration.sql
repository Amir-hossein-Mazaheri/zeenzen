/*
  Warnings:

  - You are about to drop the column `messeage` on the `notification` table. All the data in the column will be lost.
  - Added the required column `message` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notification" DROP COLUMN "messeage",
ADD COLUMN     "message" VARCHAR(255) NOT NULL;
