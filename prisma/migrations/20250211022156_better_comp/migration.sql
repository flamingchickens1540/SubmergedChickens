/*
  Warnings:

  - You are about to drop the column `team_match_A_id_num` on the `Comparison` table. All the data in the column will be lost.
  - You are about to drop the column `team_match_B_id_num` on the `Comparison` table. All the data in the column will be lost.
  - Added the required column `team_A_match_key` to the `Comparison` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_A_team_num` to the `Comparison` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_B_match_key` to the `Comparison` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_B_team_num` to the `Comparison` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comparison" DROP CONSTRAINT "Comparison_team_match_A_id_num_fkey";

-- DropForeignKey
ALTER TABLE "Comparison" DROP CONSTRAINT "Comparison_team_match_B_id_num_fkey";

-- AlterTable
ALTER TABLE "Comparison" DROP COLUMN "team_match_A_id_num",
DROP COLUMN "team_match_B_id_num",
ADD COLUMN     "team_A_match_key" TEXT NOT NULL,
ADD COLUMN     "team_A_team_num" INTEGER NOT NULL,
ADD COLUMN     "team_B_match_key" TEXT NOT NULL,
ADD COLUMN     "team_B_team_num" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_team_A_match_key_team_A_team_num_fkey" FOREIGN KEY ("team_A_match_key", "team_A_team_num") REFERENCES "TeamMatch"("match_key", "team_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_team_B_match_key_team_B_team_num_fkey" FOREIGN KEY ("team_B_match_key", "team_B_team_num") REFERENCES "TeamMatch"("match_key", "team_number") ON DELETE RESTRICT ON UPDATE CASCADE;
