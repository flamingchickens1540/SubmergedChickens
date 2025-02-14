/*
  Warnings:

  - Added the required column `auto_clean_succeed` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamMatch" ADD COLUMN     "auto_clean_succeed" INTEGER NOT NULL,
ALTER COLUMN "notes" SET NOT NULL,
ALTER COLUMN "notes" SET DATA TYPE TEXT;
