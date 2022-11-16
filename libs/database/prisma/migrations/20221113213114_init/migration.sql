-- CreateEnum
CREATE TYPE "course_level_enum" AS ENUM ('ELEMENTARY', 'INTERMEDIATE', 'ADVANCED', 'MIXED');

-- CreateEnum
CREATE TYPE "expertise_level_enum" AS ENUM ('LOW', 'JUNIOR', 'MEDIUM', 'MID_SENIOR', 'SENIOR', 'EXPERT');

-- CreateEnum
CREATE TYPE "order_status_enum" AS ENUM ('FULFILLED', 'PENDING', 'FAILED');

-- CreateEnum
CREATE TYPE "payment_status_enum" AS ENUM ('PENDING', 'REJECTED', 'FULFILLED', 'FAILED');

-- CreateEnum
CREATE TYPE "pre_requirement_level_enum" AS ENUM ('BASIC', 'MEDIUM', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "social_type_enum" AS ENUM ('INSTAGRAM', 'GITHUB', 'GITLAB', 'EMAIL', 'LINKEDIN', 'TELEGRAM', 'TWEETER', 'FACEBOOK', 'WHATSAPP', 'OTHER');

-- CreateEnum
CREATE TYPE "ticket_priority_enum" AS ENUM ('HIGHT', 'MODERATE', 'LOW');

-- CreateEnum
CREATE TYPE "ticket_topic_enum" AS ENUM ('COURSE', 'PAYMENT', 'IMPROVEMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "user_log_status_enum" AS ENUM ('LOGGED_IN', 'LOGGED_OUT');

-- CreateEnum
CREATE TYPE "user_role_enum" AS ENUM ('CUSTOMER', 'INSTRUCTOR', 'ADMIN');

-- CreateTable
CREATE TABLE "ask_amirhossein" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(1000) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "answer" VARCHAR(1000),
    "answered_at" DATE,

    CONSTRAINT "PK_24de23185c763126b6bd0b29d12" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatar" (
    "id" UUID NOT NULL,
    "original_name" VARCHAR NOT NULL,
    "full_path" VARCHAR(1000) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_50e36da9d45349941038eaf149d" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_item" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cart_id" UUID,
    "course_id" INTEGER,
    "unit_price" DECIMAL(20,2) NOT NULL,
    "unit_price_with_discount" DECIMAL(20,2) NOT NULL,

    CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" INTEGER,

    CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parent_id" INTEGER,
    "course_id" INTEGER,
    "deleted_at" TIMESTAMP(6),
    "author_id" INTEGER,

    CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR NOT NULL,
    "code" VARCHAR NOT NULL,
    "expires_at" DATE NOT NULL,
    "apply_to_every_thing" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "percent" DECIMAL(5,2) NOT NULL,
    "max_effect" DECIMAL(20,2),

    CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "level" "course_level_enum" NOT NULL DEFAULT 'MIXED',
    "participants_count" INTEGER NOT NULL DEFAULT 0,
    "lectures_count" INTEGER NOT NULL DEFAULT 0,
    "hours_count" INTEGER NOT NULL DEFAULT 0,
    "price" DECIMAL(20,2) NOT NULL DEFAULT 0,
    "progress" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_draft" BOOLEAN NOT NULL DEFAULT true,
    "spot_player_course_id" VARCHAR NOT NULL,
    "short_description" VARCHAR NOT NULL,
    "pre_requirements_description" VARCHAR,
    "image_id" UUID,
    "discount_percent" DECIMAL(5,2) NOT NULL DEFAULT 0,

    CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_categories_category" (
    "course_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "PK_8afe3a0b3cd0e708787fc78c2b2" PRIMARY KEY ("course_id","category_id")
);

-- CreateTable
CREATE TABLE "course_coupons_coupon" (
    "course_id" INTEGER NOT NULL,
    "coupon_id" INTEGER NOT NULL,

    CONSTRAINT "PK_9c927d7ced7a691b90b6c64b533" PRIMARY KEY ("course_id","coupon_id")
);

-- CreateTable
CREATE TABLE "course_image" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" VARCHAR(1000) NOT NULL,
    "cover_image" VARCHAR(1000) NOT NULL,

    CONSTRAINT "PK_c2553cd2a197d697fc1c8a37c60" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_instructors_instructor" (
    "course_id" INTEGER NOT NULL,
    "instructor_id" INTEGER NOT NULL,

    CONSTRAINT "PK_9bb390160c194890ff19dba97ee" PRIMARY KEY ("course_id","instructor_id")
);

-- CreateTable
CREATE TABLE "course_licenses_license" (
    "course_id" INTEGER NOT NULL,
    "license_id" INTEGER NOT NULL,

    CONSTRAINT "PK_56b018a869dfaa930eef5d918d7" PRIMARY KEY ("course_id","license_id")
);

-- CreateTable
CREATE TABLE "email_subscription" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "subscripted_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_3fab89deebd0355252568c36d0f" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "error_log" (
    "id" UUID NOT NULL,
    "action" VARCHAR NOT NULL,
    "error" JSONB NOT NULL,
    "time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "server_performance_status" JSONB NOT NULL,
    "comment" TEXT NOT NULL DEFAULT '',
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "PK_0284e7aa7afe77ea1ce1621c252" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expertise" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "level" "expertise_level_enum" NOT NULL,
    "instructor_id" INTEGER,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_0c1f773f9419573f6bc37eebb7f" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructor" (
    "id" SERIAL NOT NULL,
    "about" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_ccc0348eefb581ca002c05ef2f3" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecture" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "section_id" INTEGER,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "PK_2abef7c1e52b7b58a9f905c9643" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "license" (
    "id" SERIAL NOT NULL,
    "license_code" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "license_id" VARCHAR NOT NULL,
    "license_url" VARCHAR NOT NULL,

    CONSTRAINT "PK_f168ac1ca5ba87286d03b2ef905" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "has_discount" BOOLEAN NOT NULL DEFAULT false,
    "payment_method" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "status" "order_status_enum" NOT NULL DEFAULT 'PENDING',
    "payment_id" UUID,

    CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "course_id" INTEGER,
    "order_id" INTEGER,
    "unit_price" DECIMAL(20,2) NOT NULL,
    "unit_price_with_discount" DECIMAL(20,2) NOT NULL,

    CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" UUID NOT NULL,
    "status" "payment_status_enum" NOT NULL,
    "time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "amount" DECIMAL(20,2) NOT NULL,
    "payment_track_id" INTEGER,
    "payment_id" TEXT NOT NULL,

    CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_track" (
    "id" SERIAL NOT NULL,
    "id_pay_track_id" BIGINT NOT NULL,
    "track_id" TEXT NOT NULL,
    "card_number" VARCHAR NOT NULL,
    "hashed_card_number" VARCHAR NOT NULL,
    "paid_date" DATE NOT NULL,
    "verification_date" DATE NOT NULL,

    CONSTRAINT "PK_d67805928ae885c3ada500cfa9d" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pre_requirement" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "course_id" INTEGER,
    "image" VARCHAR NOT NULL,
    "level" "pre_requirement_level_enum" NOT NULL,

    CONSTRAINT "PK_b946bcac439293837773dfc800d" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "who_asked_id" INTEGER,
    "who_answered_id" INTEGER,
    "deleted_at" TIMESTAMP(6),
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "course_id" INTEGER,

    CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" VARCHAR(1000) NOT NULL,
    "reported_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,

    CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "course_id" INTEGER,

    CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social" (
    "id" SERIAL NOT NULL,
    "type" "social_type_enum" NOT NULL,
    "link" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "instructor_id" INTEGER,

    CONSTRAINT "PK_645aa1cff2b9f7b0e3e73d66b4d" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closed_at" DATE,
    "who_asked_id" INTEGER,
    "priority" "ticket_priority_enum" NOT NULL,
    "topic" "ticket_topic_enum" NOT NULL,

    CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_message" (
    "id" SERIAL NOT NULL,
    "sent_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "message" VARCHAR(1000) NOT NULL,
    "ticket_id" INTEGER,

    CONSTRAINT "PK_7d7c7fbe3303c18b7dbd6f1ce19" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(100),
    "lastname" VARCHAR(100),
    "email" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(20),
    "role" "user_role_enum" NOT NULL DEFAULT 'CUSTOMER',
    "password" VARCHAR NOT NULL,
    "scores" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "score_gain_rate" DECIMAL(4,2) NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "cart_id" UUID,
    "instructor_id" INTEGER,
    "avatar_id" UUID,

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_courses_course" (
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "PK_6dd699686985c05c3508b936c62" PRIMARY KEY ("user_id","course_id")
);

-- CreateTable
CREATE TABLE "user_log" (
    "id" UUID NOT NULL,
    "status" "user_log_status_enum" NOT NULL,
    "time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "PK_eca046d4b8c20d9309b35f07b69" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "validated_email" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "code" VARCHAR NOT NULL,
    "expires_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "PK_b4f01b1cd40a9ef115ee4a1b1e8" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_62d3c5b0ce63a82c48e86d904bc" ON "coupon"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_c2553cd2a197d697fc1c8a37c60" ON "course"("image_id");

-- CreateIndex
CREATE INDEX "IDX_5c816c082df054a20c4df50f76" ON "course_categories_category"("course_id");

-- CreateIndex
CREATE INDEX "IDX_a46d73cdebade5858b8696d6e4" ON "course_categories_category"("category_id");

-- CreateIndex
CREATE INDEX "IDX_4d9c9bf2098a2143843d47d43d" ON "course_coupons_coupon"("course_id");

-- CreateIndex
CREATE INDEX "IDX_5e506dba5adf0e200a039146ca" ON "course_coupons_coupon"("coupon_id");

-- CreateIndex
CREATE INDEX "IDX_13379c99de35ffcafd648a3001" ON "course_instructors_instructor"("course_id");

-- CreateIndex
CREATE INDEX "IDX_678b8ef549c5e457789379cd7b" ON "course_instructors_instructor"("instructor_id");

-- CreateIndex
CREATE INDEX "IDX_74e3fb1d40ed891c607403df12" ON "course_licenses_license"("license_id");

-- CreateIndex
CREATE INDEX "IDX_7d1695ef14c23151b37ebaefc9" ON "course_licenses_license"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_fbfd28125a35bcee99ea58f1edb" ON "email_subscription"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_28c756d4fd41223fedfbd2750e1" ON "order"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_7d55836a9260520c6814569191d" ON "payment"("payment_track_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_9fff60ac6ac1844ea4e0cfba67a" ON "payment"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_e12875dfb3b1d92d7d7c5377e22" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_01eea41349b6c9275aec646eee0" ON "user"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "REL_c506b756aa0682057bf66bdb3d" ON "user"("cart_id");

-- CreateIndex
CREATE UNIQUE INDEX "REL_11c03fb8b962b9a304677f462f" ON "user"("instructor_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_b777e56620c3f1ac0308514fc4c" ON "user"("avatar_id");

-- CreateIndex
CREATE INDEX "IDX_1b47fea24bd6fede2d4b241c76" ON "user_courses_course"("course_id");

-- CreateIndex
CREATE INDEX "IDX_2ec90888221fddeaadfc23a8b6" ON "user_courses_course"("user_id");

-- AddForeignKey
ALTER TABLE "ask_amirhossein" ADD CONSTRAINT "FK_67644a1a9fe05bd5dd361d0eb73" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "FK_b6b2a4f1f533d89d218e70db941" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "FK_d0599514eccb2bf2561849f4ccc" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "FK_d179629f2eb1981cb3055f4774b" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "FK_2d70a4dcee01cc63e073a85802b" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "FK_3ce66469b26697baa097f8da923" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "FK_8bd8d0985c0d077c8129fb4a209" FOREIGN KEY ("parent_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "FK_c2553cd2a197d697fc1c8a37c60" FOREIGN KEY ("image_id") REFERENCES "course_image"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "course_categories_category" ADD CONSTRAINT "FK_5c816c082df054a20c4df50f76c" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_categories_category" ADD CONSTRAINT "FK_a46d73cdebade5858b8696d6e47" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "course_coupons_coupon" ADD CONSTRAINT "FK_4d9c9bf2098a2143843d47d43da" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_coupons_coupon" ADD CONSTRAINT "FK_5e506dba5adf0e200a039146cac" FOREIGN KEY ("coupon_id") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "course_instructors_instructor" ADD CONSTRAINT "FK_13379c99de35ffcafd648a30012" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_instructors_instructor" ADD CONSTRAINT "FK_678b8ef549c5e457789379cd7bc" FOREIGN KEY ("instructor_id") REFERENCES "instructor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "course_licenses_license" ADD CONSTRAINT "FK_74e3fb1d40ed891c607403df12e" FOREIGN KEY ("license_id") REFERENCES "license"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "course_licenses_license" ADD CONSTRAINT "FK_7d1695ef14c23151b37ebaefc9d" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expertise" ADD CONSTRAINT "FK_cdaa49e96bab264944840731ada" FOREIGN KEY ("instructor_id") REFERENCES "instructor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lecture" ADD CONSTRAINT "FK_05b264a75ceaafc30411e2e986e" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "license" ADD CONSTRAINT "FK_260c9bd19158aa10bf92ded088e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "FK_28c756d4fd41223fedfbd2750e1" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "FK_3b4602d28a4ee57ecf0a1bfb138" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "FK_7d55836a9260520c6814569191d" FOREIGN KEY ("payment_track_id") REFERENCES "payment_track"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "FK_c66c60a17b56ec882fcd8ec770b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pre_requirement" ADD CONSTRAINT "FK_1a0b53568bd53d0835a94b0e9d4" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "FK_0842463861fea20d1c74eea4723" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "FK_3ca46176dae0d4a3ffc5d77e955" FOREIGN KEY ("who_answered_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "FK_511d4554441655da331df3c3d1a" FOREIGN KEY ("who_asked_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "FK_7e12912705e3430a0bd74dad81f" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "social" ADD CONSTRAINT "FK_645b0384bc243d90ce4fdfbb757" FOREIGN KEY ("instructor_id") REFERENCES "instructor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "FK_452a6cd397d29a6056363bff8a0" FOREIGN KEY ("who_asked_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket_message" ADD CONSTRAINT "FK_4ad0ee7daf9203dfd269bde1274" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket_message" ADD CONSTRAINT "FK_f838848778b4d433c72cb87a6be" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "FK_11c03fb8b962b9a304677f462f4" FOREIGN KEY ("instructor_id") REFERENCES "instructor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "FK_b777e56620c3f1ac0308514fc4c" FOREIGN KEY ("avatar_id") REFERENCES "avatar"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "FK_c506b756aa0682057bf66bdb3d3" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_courses_course" ADD CONSTRAINT "FK_1b47fea24bd6fede2d4b241c765" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_courses_course" ADD CONSTRAINT "FK_2ec90888221fddeaadfc23a8b69" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_log" ADD CONSTRAINT "FK_86d86e827a8e203ef7d390e081e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
