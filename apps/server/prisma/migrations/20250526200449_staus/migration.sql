-- CreateEnum
CREATE TYPE "BidOfferStatus" AS ENUM ('pending', 'accepted', 'rejected');

-- AlterTable
ALTER TABLE "BidOffer" ADD COLUMN     "status" "BidOfferStatus" NOT NULL DEFAULT 'pending';
