-- AlterTable
ALTER TABLE "EventState" ALTER COLUMN "next_match_key" DROP NOT NULL,
ALTER COLUMN "next_match_time" DROP NOT NULL;
