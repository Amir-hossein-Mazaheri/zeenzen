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

-- CreateTable
CREATE TABLE "ask_amirhossein" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(1000) NOT NULL,
    "answer" VARCHAR(1000),
    "email" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answered_at" DATE,
    "user_id" INTEGER,

    CONSTRAINT "ask_amirhossein_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatar" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "original_name" VARCHAR(255) NOT NULL,
    "full_path" VARCHAR(1000) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_item" (
    "id" SERIAL NOT NULL,
    "unit_price" DECIMAL(20,2) NOT NULL,
    "unit_price_with_discount" DECIMAL(20,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cart_id" TEXT,
    "course_id" INTEGER,

    CONSTRAINT "cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" INTEGER,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" BOOLEAN DEFAULT false,
    "course_id" INTEGER,
    "author_id" INTEGER,
    "parent_id" INTEGER,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "percent" DECIMAL(5,2) NOT NULL,
    "max_effect" DECIMAL(20,2),
    "expires_at" TIMESTAMP(3) NOT NULL,
    "apply_to_every_thing" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "spot_player_course_id" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "short_description" VARCHAR(255) NOT NULL,
    "pre_requirements_description" VARCHAR(255),
    "description" VARCHAR NOT NULL,
    "level" "course_level" NOT NULL DEFAULT 'MIXED',
    "participants_count" INTEGER NOT NULL DEFAULT 0,
    "lectures_count" INTEGER NOT NULL DEFAULT 0,
    "hours_count" INTEGER NOT NULL DEFAULT 0,
    "price" DECIMAL(20,2) NOT NULL DEFAULT 0,
    "progress" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "discount_percent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN DEFAULT false,
    "is_draft" BOOLEAN NOT NULL DEFAULT true,
    "image_id" TEXT,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_image" (
    "id" TEXT NOT NULL,
    "image" VARCHAR(1000) NOT NULL,
    "cover_image" VARCHAR(1000) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_subscription" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "subscripted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "error_log" (
    "id" TEXT NOT NULL,
    "action" VARCHAR NOT NULL,
    "error" JSONB NOT NULL,
    "comment" TEXT NOT NULL DEFAULT '',
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "server_performance_status" JSONB NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "error_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expertise" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "level" "expertise_level" NOT NULL,
    "instructor_id" INTEGER,

    CONSTRAINT "expertise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructor" (
    "id" SERIAL NOT NULL,
    "about" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecture" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN DEFAULT false,
    "section_id" INTEGER,

    CONSTRAINT "lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "license" (
    "id" SERIAL NOT NULL,
    "license_code" VARCHAR(255) NOT NULL,
    "license_id" VARCHAR(255) NOT NULL,
    "license_url" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,

    CONSTRAINT "license_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "has_discount" BOOLEAN NOT NULL DEFAULT false,
    "payment_method" VARCHAR(255) NOT NULL,
    "status" "order_status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "payment_id" TEXT,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(20,2) NOT NULL,
    "unit_price_with_discount" DECIMAL(20,2) NOT NULL,
    "course_id" INTEGER,
    "order_id" INTEGER,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "payment_id" TEXT NOT NULL,
    "amount" DECIMAL(20,2) NOT NULL,
    "status" "payment_status" NOT NULL,
    "time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "payment_track_id" INTEGER,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_track" (
    "id" SERIAL NOT NULL,
    "id_pay_track_id" BIGINT NOT NULL,
    "track_id" TEXT NOT NULL,
    "card_number" VARCHAR(255) NOT NULL,
    "hashed_card_number" VARCHAR(255) NOT NULL,
    "paid_date" DATE NOT NULL,
    "verification_date" DATE NOT NULL,

    CONSTRAINT "payment_track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pre_requirement" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "level" "pre_requirement_level" NOT NULL,
    "description" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deletedAt" BOOLEAN DEFAULT false,
    "course_id" INTEGER,

    CONSTRAINT "pre_requirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deletedAt" BOOLEAN DEFAULT false,
    "who_asked_id" INTEGER,
    "who_answered_id" INTEGER,
    "course_id" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" VARCHAR(1000) NOT NULL,
    "reported_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "course_id" INTEGER,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social" (
    "id" SERIAL NOT NULL,
    "type" "social_type" NOT NULL,
    "link" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "instructor_id" INTEGER,

    CONSTRAINT "social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "topic" "ticket_topic" NOT NULL,
    "priority" "ticket_priority" NOT NULL,
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closed_at" DATE,
    "who_asked_id" INTEGER,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_message" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR(1000) NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticket_id" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "ticket_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(100),
    "lastname" VARCHAR(100),
    "email" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(20),
    "role" "user_role" NOT NULL DEFAULT 'CUSTOMER',
    "password" VARCHAR(255) NOT NULL,
    "scores" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "score_gain_rate" DECIMAL(4,2) NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN DEFAULT false,
    "avatar_id" TEXT,
    "cart_id" TEXT,
    "instructor_id" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_log" (
    "id" TEXT NOT NULL,
    "status" "user_log_status" NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN DEFAULT false,
    "user_id" INTEGER,

    CONSTRAINT "user_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "validated_email" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "validated_email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToCourse" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CouponToCourse" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseToInstructor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseToLicense" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "coupon_code_key" ON "coupon"("code");

-- CreateIndex
CREATE UNIQUE INDEX "course_image_id_key" ON "course"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "email_subscription_email_key" ON "email_subscription"("email");

-- CreateIndex
CREATE UNIQUE INDEX "order_payment_id_key" ON "order"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_payment_id_key" ON "payment"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_payment_track_id_key" ON "payment"("payment_track_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_key" ON "user"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "user_avatar_id_key" ON "user"("avatar_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_cart_id_key" ON "user"("cart_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_instructor_id_key" ON "user"("instructor_id");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToCourse_AB_unique" ON "_CategoryToCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToCourse_B_index" ON "_CategoryToCourse"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CouponToCourse_AB_unique" ON "_CouponToCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_CouponToCourse_B_index" ON "_CouponToCourse"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToInstructor_AB_unique" ON "_CourseToInstructor"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToInstructor_B_index" ON "_CourseToInstructor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToLicense_AB_unique" ON "_CourseToLicense"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToLicense_B_index" ON "_CourseToLicense"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToUser_AB_unique" ON "_CourseToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToUser_B_index" ON "_CourseToUser"("B");

-- AddForeignKey
ALTER TABLE "ask_amirhossein" ADD CONSTRAINT "ask_amirhossein_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "course_image"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "expertise" ADD CONSTRAINT "expertise_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecture" ADD CONSTRAINT "lecture_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license" ADD CONSTRAINT "license_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_payment_track_id_fkey" FOREIGN KEY ("payment_track_id") REFERENCES "payment_track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pre_requirement" ADD CONSTRAINT "pre_requirement_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_who_asked_id_fkey" FOREIGN KEY ("who_asked_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_who_answered_id_fkey" FOREIGN KEY ("who_answered_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social" ADD CONSTRAINT "social_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_who_asked_id_fkey" FOREIGN KEY ("who_asked_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_message" ADD CONSTRAINT "ticket_message_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_message" ADD CONSTRAINT "ticket_message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "avatar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_log" ADD CONSTRAINT "user_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCourse" ADD CONSTRAINT "_CategoryToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCourse" ADD CONSTRAINT "_CategoryToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToCourse" ADD CONSTRAINT "_CouponToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToCourse" ADD CONSTRAINT "_CouponToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToInstructor" ADD CONSTRAINT "_CourseToInstructor_A_fkey" FOREIGN KEY ("A") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToInstructor" ADD CONSTRAINT "_CourseToInstructor_B_fkey" FOREIGN KEY ("B") REFERENCES "instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToLicense" ADD CONSTRAINT "_CourseToLicense_A_fkey" FOREIGN KEY ("A") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToLicense" ADD CONSTRAINT "_CourseToLicense_B_fkey" FOREIGN KEY ("B") REFERENCES "license"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToUser" ADD CONSTRAINT "_CourseToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToUser" ADD CONSTRAINT "_CourseToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
