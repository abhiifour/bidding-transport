import { BidTable } from "@/components/BidTable";
import { CreateBidForm } from "@/components/createBid";
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Staff(){
    
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-medium ">All Bids</h1>
                <Dialog>
                <DialogTrigger className="bg-black rounded-lg text-white px-6 py-1.5 cursor-pointer">Create</DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                <DialogTitle>Create a bid</DialogTitle>
                </DialogHeader>
                <CreateBidForm/>
                </DialogContent>
                </Dialog>
            </div>
            <div className="mt-10">
                <BidTable/>
            </div>
        </div>
    )
}