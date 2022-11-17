/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `section` table. All the data in the column will be lost.
  - Made the column `deleted` on table `course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `lecture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deletedAt` on table `pre_requirement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deletedAt` on table `question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `user_log` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "comment" DROP COLUMN "deleted_at",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "deleted" SET NOT NULL;

-- AlterTable
ALTER TABLE "lecture" ALTER COLUMN "deleted" SET NOT NULL;

-- AlterTable
ALTER TABLE "pre_requirement" ALTER COLUMN "deletedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "question" ALTER COLUMN "deletedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "section" DROP COLUMN "deleted_at",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "deleted" SET NOT NULL;

-- AlterTable
ALTER TABLE "user_log" ALTER COLUMN "deleted" SET NOT NULL;
