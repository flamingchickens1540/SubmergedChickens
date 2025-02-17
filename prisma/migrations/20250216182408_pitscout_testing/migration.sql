/*
  Warnings:

  - You are about to drop the column `L1` on the `TeamEvent` table. All the data in the column will be lost.
  - You are about to drop the column `L2` on the `TeamEvent` table. All the data in the column will be lost.
  - You are about to drop the column `L3` on the `TeamEvent` table. All the data in the column will be lost.
  - You are about to drop the column `L4` on the `TeamEvent` table. All the data in the column will be lost.
  - You are about to drop the column `clean` on the `TeamEvent` table. All the data in the column will be lost.
  - You are about to drop the column `deep` on the `TeamEvent` table. All the data in the column will be lost.
  - You are about to drop the column `ground` on the `TeamEvent` table. All the data in the column will be lost.
  - You are about to drop the column `net` on the `TeamEvent` table. All the data in the column will be lost.
  - You are about to drop the column `processor` on the `TeamEvent` table. All the data in the column will be lost.
  - You are about to drop the column `reef` on the `TeamEvent` table. All the data in the column will be lost.
  - You are about to drop the column `shallow` on the `TeamEvent` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `TeamEvent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[team_key,event_key]` on the table `TeamEvent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TeamEvent" DROP COLUMN "L1",
DROP COLUMN "L2",
DROP COLUMN "L3",
DROP COLUMN "L4",
DROP COLUMN "clean",
DROP COLUMN "deep",
DROP COLUMN "ground",
DROP COLUMN "net",
DROP COLUMN "processor",
DROP COLUMN "reef",
DROP COLUMN "shallow",
DROP COLUMN "source",
ADD COLUMN     "algaeIntakeGround" BOOLEAN,
ADD COLUMN     "algaeIntakeL2" BOOLEAN,
ADD COLUMN     "algaeIntakeL3" BOOLEAN,
ADD COLUMN     "algaeIntakeLollipop" BOOLEAN,
ADD COLUMN     "algaeScoreNet" BOOLEAN,
ADD COLUMN     "algaeScoreProcessor" BOOLEAN,
ADD COLUMN     "cleanScoreL2" BOOLEAN,
ADD COLUMN     "cleanScoreL3" BOOLEAN,
ADD COLUMN     "coralIntakeGround" BOOLEAN,
ADD COLUMN     "coralIntakeSource" BOOLEAN,
ADD COLUMN     "coralScoreL1" BOOLEAN,
ADD COLUMN     "coralScoreL2" BOOLEAN,
ADD COLUMN     "coralScoreL3" BOOLEAN,
ADD COLUMN     "coralScoreL4" BOOLEAN,
ADD COLUMN     "dataCollected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deepClimb" BOOLEAN,
ADD COLUMN     "imageCollected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shallowClimb" BOOLEAN,
ALTER COLUMN "summary" SET DEFAULT '',
ALTER COLUMN "drivetrain" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TeamEvent_team_key_event_key_key" ON "TeamEvent"("team_key", "event_key");
