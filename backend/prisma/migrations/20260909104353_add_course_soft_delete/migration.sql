-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "courses_isDeleted_idx" ON "courses"("isDeleted");
