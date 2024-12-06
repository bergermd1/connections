/*
  Warnings:

  - A unique constraint covering the columns `[puzzleId]` on the table `puzzle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "puzzle_puzzleId_key" ON "puzzle"("puzzleId");
