/*
  Warnings:

  - The primary key for the `avatar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `course_image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `error_log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_log` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "avatar_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "cart_item" ALTER COLUMN "cart_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "image_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "course_image" DROP CONSTRAINT "course_image_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "course_image_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "error_log" DROP CONSTRAINT "error_log_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "error_log_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "payment_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "payment" DROP CONSTRAINT "payment_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "payment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "avatar_id" SET DATA TYPE TEXT,
ALTER COLUMN "cart_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user_log" DROP CONSTRAINT "user_log_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_log_pkey" PRIMARY KEY ("id");

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
