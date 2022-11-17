/*
  Warnings:

  - The primary key for the `avatar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `cart_id` column on the `cart_item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `image_id` column on the `course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `course_image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `error_log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `payment_id` column on the `order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `avatar_id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cart_id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user_log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `avatar` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `course_image` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `error_log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `user_log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_image_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_avatar_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_cart_id_fkey";

-- AlterTable
ALTER TABLE "avatar" DROP CONSTRAINT "avatar_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "avatar_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "cart_item" DROP COLUMN "cart_id",
ADD COLUMN     "cart_id" UUID;

-- AlterTable
ALTER TABLE "course" DROP COLUMN "image_id",
ADD COLUMN     "image_id" UUID;

-- AlterTable
ALTER TABLE "course_image" DROP CONSTRAINT "course_image_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "course_image_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "error_log" DROP CONSTRAINT "error_log_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "error_log_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "order" DROP COLUMN "payment_id",
ADD COLUMN     "payment_id" UUID;

-- AlterTable
ALTER TABLE "payment" DROP CONSTRAINT "payment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "payment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP COLUMN "avatar_id",
ADD COLUMN     "avatar_id" UUID,
DROP COLUMN "cart_id",
ADD COLUMN     "cart_id" UUID;

-- AlterTable
ALTER TABLE "user_log" DROP CONSTRAINT "user_log_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "user_log_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "course_image_id_key" ON "course"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_payment_id_key" ON "order"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_avatar_id_key" ON "user"("avatar_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_cart_id_key" ON "user"("cart_id");

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "course_image"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "avatar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
