-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'staff');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "BidStatus" AS ENUM ('open', 'accepted', 'closed');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transporter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT,
    "vehicleType" TEXT,
    "capacity" DOUBLE PRECISION,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transporter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bid" (
    "id" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "materialType" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "deliveryLocation" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "basePriceEstimate" DOUBLE PRECISION,
    "status" "BidStatus" NOT NULL DEFAULT 'open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BidOffer" (
    "id" TEXT NOT NULL,
    "bidId" TEXT NOT NULL,
    "transporterId" TEXT NOT NULL,
    "offeredPrice" DOUBLE PRECISION NOT NULL,
    "offerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BidOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManualDeal" (
    "id" TEXT NOT NULL,
    "transporterId" TEXT NOT NULL,
    "loggedById" TEXT NOT NULL,
    "materialType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "dealDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ManualDeal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidOffer" ADD CONSTRAINT "BidOffer_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "Bid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidOffer" ADD CONSTRAINT "BidOffer_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "Transporter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualDeal" ADD CONSTRAINT "ManualDeal_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "Transporter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualDeal" ADD CONSTRAINT "ManualDeal_loggedById_fkey" FOREIGN KEY ("loggedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
