-- CreateTable
CREATE TABLE "stack_overflow_question" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "who_translated_id" INTEGER,

    CONSTRAINT "stack_overflow_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stack_overflow_answer" (
    "id" SERIAL NOT NULL,
    "translation" TEXT NOT NULL,
    "question_id" INTEGER,

    CONSTRAINT "stack_overflow_answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stack_overflow_question" ADD CONSTRAINT "stack_overflow_question_who_translated_id_fkey" FOREIGN KEY ("who_translated_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stack_overflow_answer" ADD CONSTRAINT "stack_overflow_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "stack_overflow_question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
