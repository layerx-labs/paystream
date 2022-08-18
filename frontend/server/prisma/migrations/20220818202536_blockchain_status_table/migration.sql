-- AlterEnum
ALTER TYPE "StreamStatus" ADD VALUE 'PAUSED';

-- CreateTable
CREATE TABLE "TransactionBlockStatus" (
    "id" VARCHAR(30) NOT NULL,
    "blockNumber" INTEGER NOT NULL,
    "txIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionBlockStatus_pkey" PRIMARY KEY ("id")
);
