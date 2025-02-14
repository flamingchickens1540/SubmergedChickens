/*
  Warnings:

  - You are about to drop the `ActionData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActionDataToTeamMatch` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TeleAction" AS ENUM ('ScoreAlgaeProcessor', 'ScoreAlgaeNet', 'CleanAlgaeL2', 'CleanAlgaeL3', 'ScoreCoralL1', 'ScoreCoralL2', 'ScoreCoralL3', 'ScoreCoralL4', 'Incap');

-- CreateEnum
CREATE TYPE "AutoAction" AS ENUM ('IntakeCoral', 'IntakeStation', 'IntakePreplaced', 'IntakeAlgaePreplaced', 'IntakeAlgaeReef', 'LeaveStart', 'ScoreAlgaeProcessor', 'ScoreAlgaeNet', 'CleanAlgaeL2', 'CleanAlgaeL3', 'ScoreCoralL1', 'ScoreCoralL2', 'ScoreCoralL3', 'ScoreCoralL4', 'Incap');

-- DropForeignKey
ALTER TABLE "_ActionDataToTeamMatch" DROP CONSTRAINT "_ActionDataToTeamMatch_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActionDataToTeamMatch" DROP CONSTRAINT "_ActionDataToTeamMatch_B_fkey";

-- DropTable
DROP TABLE "ActionData";

-- DropTable
DROP TABLE "_ActionDataToTeamMatch";

-- DropEnum
DROP TYPE "Action";

-- CreateTable
CREATE TABLE "TeleActionData" (
    "id" SERIAL NOT NULL,
    "action" "TeleAction" NOT NULL,
    "success" BOOLEAN NOT NULL,

    CONSTRAINT "TeleActionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutoActionData" (
    "id" SERIAL NOT NULL,
    "action" "AutoAction" NOT NULL,
    "success" BOOLEAN NOT NULL,

    CONSTRAINT "AutoActionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeamMatchToTeleActionData" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TeamMatchToTeleActionData_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AutoActionDataToTeamMatch" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AutoActionDataToTeamMatch_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TeamMatchToTeleActionData_B_index" ON "_TeamMatchToTeleActionData"("B");

-- CreateIndex
CREATE INDEX "_AutoActionDataToTeamMatch_B_index" ON "_AutoActionDataToTeamMatch"("B");

-- AddForeignKey
ALTER TABLE "_TeamMatchToTeleActionData" ADD CONSTRAINT "_TeamMatchToTeleActionData_A_fkey" FOREIGN KEY ("A") REFERENCES "TeamMatch"("id_num") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMatchToTeleActionData" ADD CONSTRAINT "_TeamMatchToTeleActionData_B_fkey" FOREIGN KEY ("B") REFERENCES "TeleActionData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AutoActionDataToTeamMatch" ADD CONSTRAINT "_AutoActionDataToTeamMatch_A_fkey" FOREIGN KEY ("A") REFERENCES "AutoActionData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AutoActionDataToTeamMatch" ADD CONSTRAINT "_AutoActionDataToTeamMatch_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamMatch"("id_num") ON DELETE CASCADE ON UPDATE CASCADE;
