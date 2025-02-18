-- CreateEnum
CREATE TYPE "Drivetrain" AS ENUM ('Swerve', 'Tank', 'Other');

-- CreateEnum
CREATE TYPE "AutoStart" AS ENUM ('Far', 'MidFar', 'Mid', 'MidClose', 'Close');

-- CreateEnum
CREATE TYPE "TeleAction" AS ENUM ('ScoreAlgaeProcessor', 'ScoreAlgaeNet', 'CleanAlgaeL2', 'CleanAlgaeL3', 'ScoreCoralL1', 'ScoreCoralL2', 'ScoreCoralL3', 'ScoreCoralL4', 'Incap');

-- CreateEnum
CREATE TYPE "AutoAction" AS ENUM ('IntakeCoralGround', 'IntakeCoralStation', 'IntakeCoralPreplaced', 'IntakeAlgaePreplaced', 'IntakeAlgaeReef', 'LeaveStart', 'ScoreAlgaeProcessor', 'ScoreAlgaeNet', 'CleanAlgaeL2', 'CleanAlgaeL3', 'ScoreCoralL1', 'ScoreCoralL2', 'ScoreCoralL3', 'ScoreCoralL4', 'Incap');

-- CreateEnum
CREATE TYPE "Endgame" AS ENUM ('Deep', 'Shallow', 'Park', 'Fail', 'None');

-- CreateTable
CREATE TABLE "Comparison" (
    "id" SERIAL NOT NULL,
    "team_A_team_key" INTEGER NOT NULL,
    "team_A_match_key" TEXT NOT NULL,
    "team_B_team_key" INTEGER NOT NULL,
    "team_B_match_key" TEXT NOT NULL,
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
    "next_match_key" INTEGER,
    "next_match_time" INTEGER,

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
    "key" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TeamEvent" (
    "id" SERIAL NOT NULL,
    "team_key" INTEGER NOT NULL,
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
    "id_num" SERIAL NOT NULL,
    "match_key" TEXT NOT NULL,
    "team_key" INTEGER NOT NULL,
    "event_key" TEXT NOT NULL,
    "auto_start_location" "AutoStart",
    "auto_leave_start" BOOLEAN,
    "auto_intake_coral_preplaced_succeed" INTEGER,
    "auto_intake_algae_preplaced_succeed" INTEGER,
    "auto_intake_station_succeed" INTEGER,
    "auto_intake_reef_succeed" INTEGER,
    "auto_score_l1_succeed" INTEGER,
    "auto_score_l2_succeed" INTEGER,
    "auto_score_l3_succeed" INTEGER,
    "auto_score_l4_succeed" INTEGER,
    "auto_score_processor_succeed" INTEGER,
    "auto_score_net_succeed" INTEGER,
    "auto_clean_l2_succeed" INTEGER,
    "auto_clean_l3_succeed" INTEGER,
    "auto_intake_coral_preplaced_fail" INTEGER,
    "auto_intake_algae_preplaced_fail" INTEGER,
    "auto_intake_station_fail" INTEGER,
    "auto_intake_reef_fail" INTEGER,
    "auto_score_l1_fail" INTEGER,
    "auto_score_l2_fail" INTEGER,
    "auto_score_l3_fail" INTEGER,
    "auto_score_l4_fail" INTEGER,
    "auto_score_processor_fail" INTEGER,
    "auto_score_net_fail" INTEGER,
    "auto_clean_l2_fail" INTEGER,
    "auto_clean_l3_fail" INTEGER,
    "tele_score_l1_succeed" INTEGER,
    "tele_score_l2_succeed" INTEGER,
    "tele_score_l3_succeed" INTEGER,
    "tele_score_l4_succeed" INTEGER,
    "tele_score_processor_succeed" INTEGER,
    "tele_score_net_succeed" INTEGER,
    "tele_clean_l2_succeed" INTEGER,
    "tele_clean_l3_succeed" INTEGER,
    "tele_score_l1_fail" INTEGER,
    "tele_score_l2_fail" INTEGER,
    "tele_score_l3_fail" INTEGER,
    "tele_score_l4_fail" INTEGER,
    "tele_score_processor_fail" INTEGER,
    "tele_score_net_fail" INTEGER,
    "tele_clean_l2_fail" INTEGER,
    "tele_clean_l3_fail" INTEGER,
    "endgame" "Endgame",
    "skill" INTEGER,
    "notes" TEXT,
    "incap_time" DOUBLE PRECISION[],
    "scoutId" INTEGER,

    CONSTRAINT "TeamMatch_pkey" PRIMARY KEY ("id_num")
);

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
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToTeamMatch" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TagToTeamMatch_AB_pkey" PRIMARY KEY ("A","B")
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
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Team_key_key" ON "Team"("key");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMatch_match_key_team_key_key" ON "TeamMatch"("match_key", "team_key");

-- CreateIndex
CREATE INDEX "_TagToTeamMatch_B_index" ON "_TagToTeamMatch"("B");

-- CreateIndex
CREATE INDEX "_TeamMatchToTeleActionData_B_index" ON "_TeamMatchToTeleActionData"("B");

-- CreateIndex
CREATE INDEX "_AutoActionDataToTeamMatch_B_index" ON "_AutoActionDataToTeamMatch"("B");

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_team_A_match_key_team_A_team_key_fkey" FOREIGN KEY ("team_A_match_key", "team_A_team_key") REFERENCES "TeamMatch"("match_key", "team_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_team_B_match_key_team_B_team_key_fkey" FOREIGN KEY ("team_B_match_key", "team_B_team_key") REFERENCES "TeamMatch"("match_key", "team_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_event_key_fkey" FOREIGN KEY ("event_key") REFERENCES "Event"("event_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventState" ADD CONSTRAINT "EventState_event_key_fkey" FOREIGN KEY ("event_key") REFERENCES "Event"("event_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamEvent" ADD CONSTRAINT "TeamEvent_team_key_fkey" FOREIGN KEY ("team_key") REFERENCES "Team"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamEvent" ADD CONSTRAINT "TeamEvent_event_key_fkey" FOREIGN KEY ("event_key") REFERENCES "Event"("event_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_team_event_id_fkey" FOREIGN KEY ("team_event_id") REFERENCES "TeamEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_team_key_fkey" FOREIGN KEY ("team_key") REFERENCES "Team"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_event_key_fkey" FOREIGN KEY ("event_key") REFERENCES "Event"("event_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_scoutId_fkey" FOREIGN KEY ("scoutId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTeamMatch" ADD CONSTRAINT "_TagToTeamMatch_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTeamMatch" ADD CONSTRAINT "_TagToTeamMatch_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamMatch"("id_num") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMatchToTeleActionData" ADD CONSTRAINT "_TeamMatchToTeleActionData_A_fkey" FOREIGN KEY ("A") REFERENCES "TeamMatch"("id_num") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMatchToTeleActionData" ADD CONSTRAINT "_TeamMatchToTeleActionData_B_fkey" FOREIGN KEY ("B") REFERENCES "TeleActionData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AutoActionDataToTeamMatch" ADD CONSTRAINT "_AutoActionDataToTeamMatch_A_fkey" FOREIGN KEY ("A") REFERENCES "AutoActionData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AutoActionDataToTeamMatch" ADD CONSTRAINT "_AutoActionDataToTeamMatch_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamMatch"("id_num") ON DELETE CASCADE ON UPDATE CASCADE;
