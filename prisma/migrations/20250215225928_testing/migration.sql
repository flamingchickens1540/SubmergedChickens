/*
  Warnings:

  - The values [IntakeCoral,IntakeStation,IntakePreplaced] on the enum `AutoAction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AutoAction_new" AS ENUM ('IntakeCoralGround', 'IntakeCoralStation', 'IntakeCoralPreplaced', 'IntakeAlgaePreplaced', 'IntakeAlgaeReef', 'LeaveStart', 'ScoreAlgaeProcessor', 'ScoreAlgaeNet', 'CleanAlgaeL2', 'CleanAlgaeL3', 'ScoreCoralL1', 'ScoreCoralL2', 'ScoreCoralL3', 'ScoreCoralL4', 'Incap');
ALTER TABLE "AutoActionData" ALTER COLUMN "action" TYPE "AutoAction_new" USING ("action"::text::"AutoAction_new");
ALTER TYPE "AutoAction" RENAME TO "AutoAction_old";
ALTER TYPE "AutoAction_new" RENAME TO "AutoAction";
DROP TYPE "AutoAction_old";
COMMIT;
