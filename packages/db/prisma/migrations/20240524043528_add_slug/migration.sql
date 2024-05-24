/*
  Warnings:

  - The primary key for the `Likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Likes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Collections` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,trail_id]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Collections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collections" ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Collections_slug_key" ON "Collections"("slug");

-- CreateIndex
CREATE INDEX "c_index" ON "Collections"("id");

-- CreateIndex
CREATE INDEX "Likes_user_id_idx" ON "Likes"("user_id");

-- CreateIndex
CREATE INDEX "Likes_trail_id_idx" ON "Likes"("trail_id");

-- CreateIndex
CREATE UNIQUE INDEX "like_id" ON "Likes"("user_id", "trail_id");
