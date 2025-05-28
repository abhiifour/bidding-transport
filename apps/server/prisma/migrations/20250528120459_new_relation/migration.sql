-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "Transporter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
