-- AlterTable
ALTER TABLE "CurrentProduction" ALTER COLUMN "note" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PastProduction" ALTER COLUMN "note" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL;
