-- AlterTable
ALTER TABLE "ask_amirhossein" ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ask_amirhossein_answer" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false;
