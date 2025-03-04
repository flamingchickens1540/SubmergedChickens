/*
  Warnings:

  - Added the required column `isTBAVerified` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamMatch" ADD COLUMN     "isTBAVerified" BOOLEAN NOT NULL;
