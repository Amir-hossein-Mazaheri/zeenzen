/*
  Warnings:

  - You are about to drop the column `avatar_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `avatar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `avatar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_avatar_id_fkey";

-- DropIndex
DROP INDEX "user_avatar_id_key";

-- AlterTable
ALTER TABLE "avatar" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "avatar_id";

-- CreateIndex
CREATE UNIQUE INDEX "avatar_userId_key" ON "avatar"("userId");

-- AddForeignKey
ALTER TABLE "avatar" ADD CONSTRAINT "avatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
