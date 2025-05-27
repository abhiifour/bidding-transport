-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_createdById_fkey";

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
