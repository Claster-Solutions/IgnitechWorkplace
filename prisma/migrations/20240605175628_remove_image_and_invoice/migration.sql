/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `Production` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ImageToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Production" DROP CONSTRAINT "Production_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToProduct" DROP CONSTRAINT "_ImageToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToProduct" DROP CONSTRAINT "_ImageToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Production" DROP COLUMN "invoiceId";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Invoice";

-- DropTable
DROP TABLE "_ImageToProduct";
