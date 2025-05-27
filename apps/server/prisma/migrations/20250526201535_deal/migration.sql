-- CreateTable
CREATE TABLE "Deal" (
    "id" TEXT NOT NULL,
    "transporterId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bidId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);
