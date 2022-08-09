-- CreateTable
CREATE TABLE "Stream" (
    "id" VARCHAR(30) NOT NULL,
    "streamId" INTEGER NOT NULL,
    "sender" VARCHAR(50) NOT NULL,
    "recipient" VARCHAR(50) NOT NULL,
    "tokenAddress" VARCHAR(50) NOT NULL,
    "deposit" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "stopTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WithdrawFromStream" (
    "id" VARCHAR(30) NOT NULL,
    "streamId" VARCHAR(30) NOT NULL,
    "recipient" VARCHAR(50) NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WithdrawFromStream_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stream_streamId_key" ON "Stream"("streamId");

-- AddForeignKey
ALTER TABLE "WithdrawFromStream" ADD CONSTRAINT "WithdrawFromStream_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
