/*
  Warnings:

  - Added the required column `isScouted` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamMatch" ADD COLUMN     "isScouted" BOOLEAN NOT NULL;
