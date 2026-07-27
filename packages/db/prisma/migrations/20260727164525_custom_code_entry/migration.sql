/*
  Warnings:

  - Added the required column `customCode` to the `RoomState` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomState" ADD COLUMN     "customCode" TEXT NOT NULL;
