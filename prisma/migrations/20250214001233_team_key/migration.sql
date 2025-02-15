/*
  Warnings:

  - You are about to drop the column `team_A_team_num` on the `Comparison` table. All the data in the column will be lost.
  - You are about to drop the column `team_B_team_num` on the `Comparison` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `team_number` on the `TeamEvent` table. All the data in the column will be lost.
  - You are about to drop the column `team_number` on the `TeamMatch` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[match_key,team_key]` on the table `TeamMatch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `team_A_team_key` to the `Comparison` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_B_team_key` to the `Comparison` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_key` to the `TeamEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_key` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comparison" DROP CONSTRAINT "Comparison_team_A_match_key_team_A_team_num_fkey";

-- DropForeignKey
ALTER TABLE "Comparison" DROP CONSTRAINT "Comparison_team_B_match_key_team_B_team_num_fkey";

-- DropForeignKey
ALTER TABLE "TeamEvent" DROP CONSTRAINT "TeamEvent_team_number_fkey";

-- DropForeignKey
ALTER TABLE "TeamMatch" DROP CONSTRAINT "TeamMatch_team_number_fkey";

-- DropIndex
DROP INDEX "Team_number_key";

-- DropIndex
DROP INDEX "TeamMatch_match_key_team_number_key";

-- AlterTable
ALTER TABLE "Comparison" DROP COLUMN "team_A_team_num",
DROP COLUMN "team_B_team_num",
ADD COLUMN     "team_A_team_key" INTEGER NOT NULL,
ADD COLUMN     "team_B_team_key" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "number",
ADD COLUMN     "key" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TeamEvent" DROP COLUMN "team_number",
ADD COLUMN     "team_key" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TeamMatch" DROP COLUMN "team_number",
ADD COLUMN     "team_key" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Team_key_key" ON "Team"("key");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMatch_match_key_team_key_key" ON "TeamMatch"("match_key", "team_key");

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_team_A_match_key_team_A_team_key_fkey" FOREIGN KEY ("team_A_match_key", "team_A_team_key") REFERENCES "TeamMatch"("match_key", "team_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_team_B_match_key_team_B_team_key_fkey" FOREIGN KEY ("team_B_match_key", "team_B_team_key") REFERENCES "TeamMatch"("match_key", "team_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamEvent" ADD CONSTRAINT "TeamEvent_team_key_fkey" FOREIGN KEY ("team_key") REFERENCES "Team"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_team_key_fkey" FOREIGN KEY ("team_key") REFERENCES "Team"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
