-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('ONLINE', 'OFFLINE', 'BOOTCAMP');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "type" "CourseType" NOT NULL DEFAULT 'ONLINE';

-- CreateIndex
CREATE INDEX "courses_type_idx" ON "courses"("type");
