/*
  Warnings:

  - You are about to drop the column `customCode` on the `RoomState` table. All the data in the column will be lost.
  - Added the required column `customInput` to the `RoomState` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomState" DROP COLUMN "customCode",
ADD COLUMN     "customInput" TEXT NOT NULL;
