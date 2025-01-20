-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "zipCode" DROP NOT NULL,
ALTER COLUMN "country" SET DEFAULT 'CO';
