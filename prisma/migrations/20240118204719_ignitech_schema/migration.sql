/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CurrentProductionStatus" AS ENUM ('WAITING', 'IN_PROGRESS', 'BLOCKED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentProduction" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productCount" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "status" "CurrentProductionStatus" NOT NULL DEFAULT 'WAITING',
    "created" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrentProduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastProduction" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productCount" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "finished" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PastProduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CurrentProductionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PastProductionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Image_imageURL_key" ON "Image"("imageURL");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToUser_AB_unique" ON "_ProductToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToUser_B_index" ON "_ProductToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CurrentProductionToUser_AB_unique" ON "_CurrentProductionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CurrentProductionToUser_B_index" ON "_CurrentProductionToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PastProductionToUser_AB_unique" ON "_PastProductionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PastProductionToUser_B_index" ON "_PastProductionToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentProduction" ADD CONSTRAINT "CurrentProduction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastProduction" ADD CONSTRAINT "PastProduction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToUser" ADD CONSTRAINT "_ProductToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToUser" ADD CONSTRAINT "_ProductToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrentProductionToUser" ADD CONSTRAINT "_CurrentProductionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "CurrentProduction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrentProductionToUser" ADD CONSTRAINT "_CurrentProductionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PastProductionToUser" ADD CONSTRAINT "_PastProductionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "PastProduction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PastProductionToUser" ADD CONSTRAINT "_PastProductionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
