/*
  Warnings:

  - You are about to drop the column `location` on the `ClockRecord` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `ClockRecord` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ClockRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClockRecord" DROP COLUMN "location",
DROP COLUMN "time",
DROP COLUMN "type",
ADD COLUMN     "clockIn" TIMESTAMP(3),
ADD COLUMN     "clockOut" TIMESTAMP(3),
ADD COLUMN     "locationIn" TEXT,
ADD COLUMN     "locationOut" TEXT;
