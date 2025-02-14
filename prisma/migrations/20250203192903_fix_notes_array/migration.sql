/*
  Warnings:

  - The `notes` column on the `TeamMatch` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TeamMatch" DROP COLUMN "notes",
ADD COLUMN     "notes" TEXT[];
