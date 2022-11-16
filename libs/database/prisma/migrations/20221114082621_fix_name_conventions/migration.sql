/*
  Warnings:

  - The `level` column on the `course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `level` on the `expertise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `level` on the `pre_requirement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `social` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `priority` on the `ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `topic` on the `ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `user_log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "course_level" AS ENUM ('ELEMENTARY', 'INTERMEDIATE', 'ADVANCED', 'MIXED');

-- CreateEnum
CREATE TYPE "expertise_level" AS ENUM ('LOW', 'JUNIOR', 'MEDIUM', 'MID_SENIOR', 'SENIOR', 'EXPERT');

-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('FULFILLED', 'PENDING', 'FAILED');

-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('PENDING', 'REJECTED', 'FULFILLED', 'FAILED');

-- CreateEnum
CREATE TYPE "pre_requirement_level" AS ENUM ('BASIC', 'MEDIUM', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "social_type" AS ENUM ('INSTAGRAM', 'GITHUB', 'GITLAB', 'EMAIL', 'LINKEDIN', 'TELEGRAM', 'TWEETER', 'FACEBOOK', 'WHATSAPP', 'OTHER');

-- CreateEnum
CREATE TYPE "ticket_priority" AS ENUM ('HIGHT', 'MODERATE', 'LOW');

-- CreateEnum
CREATE TYPE "ticket_topic" AS ENUM ('COURSE', 'PAYMENT', 'IMPROVEMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "user_log_status" AS ENUM ('LOGGED_IN', 'LOGGED_OUT');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('CUSTOMER', 'INSTRUCTOR', 'ADMIN');

-- AlterTable
ALTER TABLE "course" DROP COLUMN "level",
ADD COLUMN     "level" "course_level" NOT NULL DEFAULT 'MIXED';

-- AlterTable
ALTER TABLE "expertise" DROP COLUMN "level",
ADD COLUMN     "level" "expertise_level" NOT NULL;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "status",
ADD COLUMN     "status" "order_status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "status",
ADD COLUMN     "status" "payment_status" NOT NULL;

-- AlterTable
ALTER TABLE "pre_requirement" DROP COLUMN "level",
ADD COLUMN     "level" "pre_requirement_level" NOT NULL;

-- AlterTable
ALTER TABLE "social" DROP COLUMN "type",
ADD COLUMN     "type" "social_type" NOT NULL;

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "priority",
ADD COLUMN     "priority" "ticket_priority" NOT NULL,
DROP COLUMN "topic",
ADD COLUMN     "topic" "ticket_topic" NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "user_role" NOT NULL DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE "user_log" DROP COLUMN "status",
ADD COLUMN     "status" "user_log_status" NOT NULL;

-- DropEnum
DROP TYPE "course_level_enum";

-- DropEnum
DROP TYPE "expertise_level_enum";

-- DropEnum
DROP TYPE "order_status_enum";

-- DropEnum
DROP TYPE "payment_status_enum";

-- DropEnum
DROP TYPE "pre_requirement_level_enum";

-- DropEnum
DROP TYPE "social_type_enum";

-- DropEnum
DROP TYPE "ticket_priority_enum";

-- DropEnum
DROP TYPE "ticket_topic_enum";

-- DropEnum
DROP TYPE "user_log_status_enum";

-- DropEnum
DROP TYPE "user_role_enum";
