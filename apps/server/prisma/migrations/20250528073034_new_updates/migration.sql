-- DropForeignKey
ALTER TABLE "ManualDeal" DROP CONSTRAINT "ManualDeal_loggedById_fkey";

-- AddForeignKey
ALTER TABLE "ManualDeal" ADD CONSTRAINT "ManualDeal_loggedById_fkey" FOREIGN KEY ("loggedById") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
