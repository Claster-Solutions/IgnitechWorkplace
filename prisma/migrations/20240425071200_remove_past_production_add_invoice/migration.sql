/*
  Warnings:

  - You are about to drop the column `productId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the `CurrentProduction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PastProduction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CurrentProductionToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PastProductionToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CurrentProduction" DROP CONSTRAINT "CurrentProduction_productId_fkey";

-- DropForeignKey
ALTER TABLE "CurrentProduction" DROP CONSTRAINT "CurrentProduction_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- DropForeignKey
ALTER TABLE "PastProduction" DROP CONSTRAINT "PastProduction_productId_fkey";

-- DropForeignKey
ALTER TABLE "_CurrentProductionToUser" DROP CONSTRAINT "_CurrentProductionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CurrentProductionToUser" DROP CONSTRAINT "_CurrentProductionToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_PastProductionToUser" DROP CONSTRAINT "_PastProductionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PastProductionToUser" DROP CONSTRAINT "_PastProductionToUser_B_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "productId";

-- DropTable
DROP TABLE "CurrentProduction";

-- DropTable
DROP TABLE "PastProduction";

-- DropTable
DROP TABLE "_CurrentProductionToUser";

-- DropTable
DROP TABLE "_PastProductionToUser";

-- CreateTable
CREATE TABLE "Production" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "productCount" INTEGER NOT NULL,
    "note" TEXT,
    "created" TIMESTAMP(3) NOT NULL,
    "finished" TIMESTAMP(3),

    CONSTRAINT "Production_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "invoiceURL" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ImageToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceURL_key" ON "Invoice"("invoiceURL");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductionToUser_AB_unique" ON "_ProductionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductionToUser_B_index" ON "_ProductionToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToProduct_AB_unique" ON "_ImageToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToProduct_B_index" ON "_ImageToProduct"("B");

-- AddForeignKey
ALTER TABLE "Production" ADD CONSTRAINT "Production_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Production" ADD CONSTRAINT "Production_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Production" ADD CONSTRAINT "Production_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductionToUser" ADD CONSTRAINT "_ProductionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Production"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductionToUser" ADD CONSTRAINT "_ProductionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToProduct" ADD CONSTRAINT "_ImageToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToProduct" ADD CONSTRAINT "_ImageToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
