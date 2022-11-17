/*
  Warnings:

  - You are about to drop the column `deleted` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `error_log` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `lecture` table. All the data in the column will be lost.
  - You are about to alter the column `label` on the `lecture` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.
  - You are about to drop the column `deleted` on the `section` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `user_log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comment" DROP COLUMN "deleted",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "course" DROP COLUMN "deleted",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "error_log" DROP COLUMN "deleted",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "lecture" DROP COLUMN "deleted",
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ALTER COLUMN "label" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "section" DROP COLUMN "deleted",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user" DROP COLUMN "deleted",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user_log" DROP COLUMN "deleted",
ADD COLUMN     "deleted_at" TIMESTAMP(3);
