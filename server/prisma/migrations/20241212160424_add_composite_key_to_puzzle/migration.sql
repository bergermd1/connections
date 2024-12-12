/*
  Warnings:

  - The primary key for the `puzzle` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "puzzle_puzzleId_key";

-- AlterTable
ALTER TABLE "puzzle" DROP CONSTRAINT "puzzle_pkey",
ADD CONSTRAINT "puzzle_pkey" PRIMARY KEY ("puzzleId", "userId");
