/*
  Warnings:

  - Added the required column `postCreatedAt` to the `Trend` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trend" ADD COLUMN     "postCreatedAt" TIMESTAMP(3) NOT NULL;
