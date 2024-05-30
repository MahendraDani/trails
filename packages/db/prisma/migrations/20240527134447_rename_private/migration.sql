/*
  Warnings:

  - You are about to drop the column `private` on the `Collections` table. All the data in the column will be lost.
  - You are about to drop the column `trailCount` on the `Collections` table. All the data in the column will be lost.
  - You are about to drop the column `private` on the `Trails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collections" DROP COLUMN "private",
DROP COLUMN "trailCount";

-- AlterTable
ALTER TABLE "Trails" DROP COLUMN "private",
ADD COLUMN     "is_private" BOOLEAN NOT NULL DEFAULT true;
