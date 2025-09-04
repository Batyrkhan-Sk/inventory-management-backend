/*
  Warnings:

  - You are about to drop the column `description` on the `CustomField` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `CustomField` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `customIdFormat` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `isPublic` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."DiscussionPost" DROP CONSTRAINT "DiscussionPost_inventoryId_fkey";

-- AlterTable
ALTER TABLE "public"."CustomField" DROP COLUMN "description",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "public"."DiscussionPost" ADD COLUMN     "itemId" TEXT,
ALTER COLUMN "inventoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Inventory" DROP COLUMN "category",
DROP COLUMN "customIdFormat",
DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "isPublic";

-- AlterTable
ALTER TABLE "public"."Item" DROP COLUMN "data",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrl" TEXT;

-- CreateTable
CREATE TABLE "public"."ItemField" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "customFieldId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ItemField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ItemField" ADD CONSTRAINT "ItemField_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ItemField" ADD CONSTRAINT "ItemField_customFieldId_fkey" FOREIGN KEY ("customFieldId") REFERENCES "public"."CustomField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DiscussionPost" ADD CONSTRAINT "DiscussionPost_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DiscussionPost" ADD CONSTRAINT "DiscussionPost_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "public"."Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
