/*
  Warnings:

  - A unique constraint covering the columns `[inventoryId,customId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Item_customId_key";

-- AlterTable
ALTER TABLE "public"."Inventory" ADD COLUMN     "customIdFormat" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "Item_inventoryId_customId_key" ON "public"."Item"("inventoryId", "customId");
