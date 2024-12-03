/*
  Warnings:

  - You are about to drop the column `answer` on the `key` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "key" DROP COLUMN "answer",
ADD COLUMN     "answers" TEXT[];
