-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_avatar_id_fkey";

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "avatar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
