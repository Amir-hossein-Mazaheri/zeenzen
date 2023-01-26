-- CreateEnum
CREATE TYPE "notification_actions" AS ENUM ('TICKET', 'COURSE', 'PAYMENT', 'INSTRUCTOR', 'SCORE', 'OTHER');

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "messeage" VARCHAR(255) NOT NULL,
    "action" "notification_actions" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);
