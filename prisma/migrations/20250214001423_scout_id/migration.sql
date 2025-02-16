/*
  Warnings:

  - You are about to drop the column `userId` on the `TeamMatch` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeamMatch" DROP CONSTRAINT "TeamMatch_userId_fkey";

-- AlterTable
ALTER TABLE "TeamMatch" DROP COLUMN "userId",
ADD COLUMN     "scoutId" INTEGER;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_scoutId_fkey" FOREIGN KEY ("scoutId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
