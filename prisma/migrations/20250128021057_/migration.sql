/*
  Warnings:

  - The values [AutoIntakeGround,AutoIntakeSource,TeleIntakeGround,TeleIntakeSource,TeleIntakeReef] on the enum `Action` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `auto_intake_ground_fail` on the `TeamMatch` table. All the data in the column will be lost.
  - You are about to drop the column `auto_intake_ground_succeed` on the `TeamMatch` table. All the data in the column will be lost.
  - You are about to drop the column `auto_intake_source_fail` on the `TeamMatch` table. All the data in the column will be lost.
  - You are about to drop the column `auto_intake_source_succeed` on the `TeamMatch` table. All the data in the column will be lost.
  - You are about to drop the column `auto_leave_start_fail` on the `TeamMatch` table. All the data in the column will be lost.
  - You are about to drop the column `tele_intake_ground_fail` on the `TeamMatch` table. All the data in the column will be lost.
  - You are about to drop the column `tele_intake_ground_succeed` on the `TeamMatch` table. All the data in the column will be lost.
  - You are about to drop the column `tele_intake_reef_fail` on the `TeamMatch` table. All the data in the column will be lost.
  - You are about to drop the column `tele_intake_reef_succeed` on the `TeamMatch` table. All the data in the column will be lost.
  - You are about to drop the column `tele_intake_source_fail` on the `TeamMatch` table. All the data in the column will be lost.
  - You are about to drop the column `tele_intake_source_succeed` on the `TeamMatch` table. All the data in the column will be lost.
  - Added the required column `auto_intake_algae_preplaced_fail` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auto_intake_algae_preplaced_succeed` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auto_intake_coral_preplaced_fail` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auto_intake_coral_preplaced_succeed` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auto_intake_station_fail` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auto_intake_station_succeed` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Action_new" AS ENUM ('AutoLeaveStart', 'AutoIntakeCoralPreplaced', 'AutoIntakeAlgaePreplaced', 'AutoIntakeStation', 'AutoIntakeReef', 'AutoScoreL1', 'AutoScoreL2', 'AutoScoreL3', 'AutoScoreL4', 'AutoScoreProcessor', 'AutoScoreNet', 'AutoClean', 'TeleScoreL1', 'TeleScoreL2', 'TeleScoreL3', 'TeleScoreL4', 'TeleScoreProcessor', 'TeleScoreNet', 'TeleClean', 'IncapStart', 'IncapEnd');
ALTER TABLE "ActionData" ALTER COLUMN "action" TYPE "Action_new" USING ("action"::text::"Action_new");
ALTER TYPE "Action" RENAME TO "Action_old";
ALTER TYPE "Action_new" RENAME TO "Action";
DROP TYPE "Action_old";
COMMIT;

-- AlterTable
ALTER TABLE "TeamMatch" DROP COLUMN "auto_intake_ground_fail",
DROP COLUMN "auto_intake_ground_succeed",
DROP COLUMN "auto_intake_source_fail",
DROP COLUMN "auto_intake_source_succeed",
DROP COLUMN "auto_leave_start_fail",
DROP COLUMN "tele_intake_ground_fail",
DROP COLUMN "tele_intake_ground_succeed",
DROP COLUMN "tele_intake_reef_fail",
DROP COLUMN "tele_intake_reef_succeed",
DROP COLUMN "tele_intake_source_fail",
DROP COLUMN "tele_intake_source_succeed",
ADD COLUMN     "auto_intake_algae_preplaced_fail" INTEGER NOT NULL,
ADD COLUMN     "auto_intake_algae_preplaced_succeed" INTEGER NOT NULL,
ADD COLUMN     "auto_intake_coral_preplaced_fail" INTEGER NOT NULL,
ADD COLUMN     "auto_intake_coral_preplaced_succeed" INTEGER NOT NULL,
ADD COLUMN     "auto_intake_station_fail" INTEGER NOT NULL,
ADD COLUMN     "auto_intake_station_succeed" INTEGER NOT NULL;
