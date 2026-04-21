-- AlterTable
ALTER TABLE "Trend" ADD COLUMN     "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[];
