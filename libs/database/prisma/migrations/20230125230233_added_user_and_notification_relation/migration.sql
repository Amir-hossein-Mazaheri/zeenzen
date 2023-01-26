/*
  Warnings:

  - Added the required column `userId` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `action` on the `notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "notification_action" AS ENUM ('TICKET', 'COURSE', 'PAYMENT', 'INSTRUCTOR', 'SCORE', 'OTHER');

-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "action",
ADD COLUMN     "action" "notification_action" NOT NULL;

-- DropEnum
DROP TYPE "notification_actions";

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
