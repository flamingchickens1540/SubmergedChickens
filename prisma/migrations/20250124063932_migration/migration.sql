/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Drivetrain" AS ENUM ('Swerve', 'Tank', 'Other');

-- CreateEnum
CREATE TYPE "AutoStart" AS ENUM ('Far', 'MidFar', 'Mid', 'MidClose', 'Close');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('AutoLeaveStart', 'AutoIntakeGround', 'AutoIntakeSource', 'AutoIntakeReef', 'AutoScoreL1', 'AutoScoreL2', 'AutoScoreL3', 'AutoScoreL4', 'AutoScoreProcessor', 'AutoScoreNet', 'AutoClean', 'TeleIntakeGround', 'TeleIntakeSource', 'TeleIntakeReef', 'TeleScoreL1', 'TeleScoreL2', 'TeleScoreL3', 'TeleScoreL4', 'TeleScoreProcessor', 'TeleScoreNet', 'TeleClean', 'IncapStart', 'IncapEnd');

-- CreateEnum
CREATE TYPE "Endgame" AS ENUM ('Deep', 'Shallow', 'Park', 'Fail', 'None');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Comparison" (
    "id" SERIAL NOT NULL,
    "team_match_A_id" INTEGER NOT NULL,
    "team_match_B_id" INTEGER NOT NULL,
    "diff" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "event_key" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Comparison_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventState" (
    "id" SERIAL NOT NULL,
    "event_key" TEXT NOT NULL,
    "stream_url" TEXT NOT NULL,
    "next_match_key" INTEGER NOT NULL,
    "next_match_time" INTEGER NOT NULL,

    CONSTRAINT "EventState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "event_key" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_key")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TeamEvent" (
    "id" SERIAL NOT NULL,
    "team_number" INTEGER NOT NULL,
    "event_key" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "drivetrain" "Drivetrain" NOT NULL,
    "L1" BOOLEAN NOT NULL,
    "L2" BOOLEAN NOT NULL,
    "L3" BOOLEAN NOT NULL,
    "L4" BOOLEAN NOT NULL,
    "clean" BOOLEAN NOT NULL,
    "processor" BOOLEAN NOT NULL,
    "net" BOOLEAN NOT NULL,
    "source" BOOLEAN NOT NULL,
    "ground" BOOLEAN NOT NULL,
    "reef" BOOLEAN NOT NULL,
    "shallow" BOOLEAN NOT NULL,
    "deep" BOOLEAN NOT NULL,

    CONSTRAINT "TeamEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "team_event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMatch" (
    "id" SERIAL NOT NULL,
    "team_number" INTEGER NOT NULL,
    "event_key" TEXT NOT NULL,
    "auto_start_location" "AutoStart" NOT NULL,
    "auto_leave_start" BOOLEAN NOT NULL,
    "auto_intake_ground_succeed" INTEGER NOT NULL,
    "auto_intake_source_succeed" INTEGER NOT NULL,
    "auto_intake_reef_succeed" INTEGER NOT NULL,
    "auto_score_l1_succeed" INTEGER NOT NULL,
    "auto_score_l2_succeed" INTEGER NOT NULL,
    "auto_score_l3_succeed" INTEGER NOT NULL,
    "auto_score_l4_succeed" INTEGER NOT NULL,
    "auto_score_processor_succeed" INTEGER NOT NULL,
    "auto_score_net_succeed" INTEGER NOT NULL,
    "auto_clean_succeed" INTEGER NOT NULL,
    "auto_leave_start_fail" INTEGER NOT NULL,
    "auto_intake_ground_fail" INTEGER NOT NULL,
    "auto_intake_source_fail" INTEGER NOT NULL,
    "auto_intake_reef_fail" INTEGER NOT NULL,
    "auto_score_l1_fail" INTEGER NOT NULL,
    "auto_score_l2_fail" INTEGER NOT NULL,
    "auto_score_l3_fail" INTEGER NOT NULL,
    "auto_score_l4_fail" INTEGER NOT NULL,
    "auto_score_processor_fail" INTEGER NOT NULL,
    "auto_score_net_fail" INTEGER NOT NULL,
    "auto_clean_fail" INTEGER NOT NULL,
    "tele_intake_ground_succeed" INTEGER NOT NULL,
    "tele_intake_source_succeed" INTEGER NOT NULL,
    "tele_intake_reef_succeed" INTEGER NOT NULL,
    "tele_score_l1_succeed" INTEGER NOT NULL,
    "tele_score_l2_succeed" INTEGER NOT NULL,
    "tele_score_l3_succeed" INTEGER NOT NULL,
    "tele_score_l4_succeed" INTEGER NOT NULL,
    "tele_score_processor_succeed" INTEGER NOT NULL,
    "tele_score_net_succeed" INTEGER NOT NULL,
    "tele_clean_succeed" INTEGER NOT NULL,
    "tele_intake_ground_fail" INTEGER NOT NULL,
    "tele_intake_source_fail" INTEGER NOT NULL,
    "tele_intake_reef_fail" INTEGER NOT NULL,
    "tele_score_l1_fail" INTEGER NOT NULL,
    "tele_score_l2_fail" INTEGER NOT NULL,
    "tele_score_l3_fail" INTEGER NOT NULL,
    "tele_score_l4_fail" INTEGER NOT NULL,
    "tele_score_processor_fail" INTEGER NOT NULL,
    "tele_score_net_fail" INTEGER NOT NULL,
    "tele_clean_fail" INTEGER NOT NULL,
    "endgame" "Endgame" NOT NULL,
    "skill" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "incap_time" DOUBLE PRECISION[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TeamMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionData" (
    "id" SERIAL NOT NULL,
    "action" "Action" NOT NULL,
    "success" BOOLEAN NOT NULL,

    CONSTRAINT "ActionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToTeamMatch" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TagToTeamMatch_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ActionDataToTeamMatch" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ActionDataToTeamMatch_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_number_key" ON "Team"("number");

-- CreateIndex
CREATE INDEX "_TagToTeamMatch_B_index" ON "_TagToTeamMatch"("B");

-- CreateIndex
CREATE INDEX "_ActionDataToTeamMatch_B_index" ON "_ActionDataToTeamMatch"("B");

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_team_match_A_id_fkey" FOREIGN KEY ("team_match_A_id") REFERENCES "TeamMatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_team_match_B_id_fkey" FOREIGN KEY ("team_match_B_id") REFERENCES "TeamMatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_event_key_fkey" FOREIGN KEY ("event_key") REFERENCES "Event"("event_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventState" ADD CONSTRAINT "EventState_event_key_fkey" FOREIGN KEY ("event_key") REFERENCES "Event"("event_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamEvent" ADD CONSTRAINT "TeamEvent_team_number_fkey" FOREIGN KEY ("team_number") REFERENCES "Team"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamEvent" ADD CONSTRAINT "TeamEvent_event_key_fkey" FOREIGN KEY ("event_key") REFERENCES "Event"("event_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_team_event_id_fkey" FOREIGN KEY ("team_event_id") REFERENCES "TeamEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_team_number_fkey" FOREIGN KEY ("team_number") REFERENCES "Team"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_event_key_fkey" FOREIGN KEY ("event_key") REFERENCES "Event"("event_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTeamMatch" ADD CONSTRAINT "_TagToTeamMatch_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTeamMatch" ADD CONSTRAINT "_TagToTeamMatch_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamMatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionDataToTeamMatch" ADD CONSTRAINT "_ActionDataToTeamMatch_A_fkey" FOREIGN KEY ("A") REFERENCES "ActionData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionDataToTeamMatch" ADD CONSTRAINT "_ActionDataToTeamMatch_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamMatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
