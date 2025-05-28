import { createBid, getAllBids } from '@/lib/api/bid';
import { createManualDeal, deleteManualDeal, editManualDeal, getAllDeals, getAllManualDeals } from '@/lib/api/deal';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';


export function useGetBids() {
  return useQuery<any>({
    queryKey: ['bids'],
    queryFn:  () => getAllBids(),
    staleTime: 1000 * 60 * 5, // 5 mins,
  });
}


export function useCreateBid() {

    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ requirement, createdById, materialType, quantity, pickupLocation, deliveryLocation, deadline }: { requirement: string, createdById: string, materialType: string, quantity: number, pickupLocation: string, deliveryLocation: string, deadline: Date }) =>
        createBid(requirement, createdById, materialType, quantity, pickupLocation, deliveryLocation, deadline),

      onSuccess: (_, { }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['bids'] });
        toast.success("Bid created successfully");

      },
      onError: (error) => {
        toast.error("Error creating bid: " + error.message);
      }
    });
}
