-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nationalId" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" TEXT;
