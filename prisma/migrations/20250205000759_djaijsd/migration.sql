/*
  Warnings:

  - You are about to drop the column `auto_clean_fail` on the `TeamMatch` table. All the data in the column will be lost.
  - You are about to drop the column `auto_clean_succeed` on the `TeamMatch` table. All the data in the column will be lost.
  - You are about to drop the column `tele_clean_fail` on the `TeamMatch` table. All the data in the column will be lost.
  - You are about to drop the column `tele_clean_succeed` on the `TeamMatch` table. All the data in the column will be lost.
  - Added the required column `auto_clean_l2_fail` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auto_clean_l2_succeed` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auto_clean_l3_fail` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auto_clean_l3_succeed` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tele_clean_l2_fail` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tele_clean_l2_succeed` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tele_clean_l3_fail` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tele_clean_l3_succeed` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamMatch" DROP COLUMN "auto_clean_fail",
DROP COLUMN "auto_clean_succeed",
DROP COLUMN "tele_clean_fail",
DROP COLUMN "tele_clean_succeed",
ADD COLUMN     "auto_clean_l2_fail" INTEGER NOT NULL,
ADD COLUMN     "auto_clean_l2_succeed" INTEGER NOT NULL,
ADD COLUMN     "auto_clean_l3_fail" INTEGER NOT NULL,
ADD COLUMN     "auto_clean_l3_succeed" INTEGER NOT NULL,
ADD COLUMN     "tele_clean_l2_fail" INTEGER NOT NULL,
ADD COLUMN     "tele_clean_l2_succeed" INTEGER NOT NULL,
ADD COLUMN     "tele_clean_l3_fail" INTEGER NOT NULL,
ADD COLUMN     "tele_clean_l3_succeed" INTEGER NOT NULL;
