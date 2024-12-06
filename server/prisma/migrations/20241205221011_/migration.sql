/*
  Warnings:

  - You are about to drop the column `puzzleId` on the `key` table. All the data in the column will be lost.
  - Added the required column `connectionId` to the `key` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "key" DROP COLUMN "puzzleId",
ADD COLUMN     "connectionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "puzzle" (
    "puzzleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "mistakes" INTEGER NOT NULL,

    CONSTRAINT "puzzle_pkey" PRIMARY KEY ("puzzleId")
);

-- AddForeignKey
ALTER TABLE "puzzle" ADD CONSTRAINT "puzzle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
