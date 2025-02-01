/*
  Warnings:

  - You are about to drop the column `team_match_A_id` on the `Comparison` table. All the data in the column will be lost.
  - You are about to drop the column `team_match_B_id` on the `Comparison` table. All the data in the column will be lost.
  - The primary key for the `TeamMatch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TeamMatch` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[match_key,team_number]` on the table `TeamMatch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `team_match_A_id_num` to the `Comparison` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_match_B_id_num` to the `Comparison` table without a default value. This is not possible if the table is not empty.
  - Added the required column `match_key` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comparison" DROP CONSTRAINT "Comparison_team_match_A_id_fkey";

-- DropForeignKey
ALTER TABLE "Comparison" DROP CONSTRAINT "Comparison_team_match_B_id_fkey";

-- DropForeignKey
ALTER TABLE "_ActionDataToTeamMatch" DROP CONSTRAINT "_ActionDataToTeamMatch_B_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTeamMatch" DROP CONSTRAINT "_TagToTeamMatch_B_fkey";

-- AlterTable
ALTER TABLE "Comparison" DROP COLUMN "team_match_A_id",
DROP COLUMN "team_match_B_id",
ADD COLUMN     "team_match_A_id_num" INTEGER NOT NULL,
ADD COLUMN     "team_match_B_id_num" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TeamMatch" DROP CONSTRAINT "TeamMatch_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_num" SERIAL NOT NULL,
ADD COLUMN     "match_key" TEXT NOT NULL,
ADD CONSTRAINT "TeamMatch_pkey" PRIMARY KEY ("id_num");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMatch_match_key_team_number_key" ON "TeamMatch"("match_key", "team_number");

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_team_match_A_id_num_fkey" FOREIGN KEY ("team_match_A_id_num") REFERENCES "TeamMatch"("id_num") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_team_match_B_id_num_fkey" FOREIGN KEY ("team_match_B_id_num") REFERENCES "TeamMatch"("id_num") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTeamMatch" ADD CONSTRAINT "_TagToTeamMatch_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamMatch"("id_num") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionDataToTeamMatch" ADD CONSTRAINT "_ActionDataToTeamMatch_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamMatch"("id_num") ON DELETE CASCADE ON UPDATE CASCADE;
