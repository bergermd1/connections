/*
  Warnings:

  - Added the required column `puzzleId` to the `key` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "key" ADD COLUMN     "puzzleId" INTEGER NOT NULL;
