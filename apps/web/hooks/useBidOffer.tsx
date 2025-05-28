import { createBid, getAllBids } from '@/lib/api/bid';
import { createBidOffer, getABidOffer, getAllBidOffers, updateBidOffer } from '@/lib/api/bidOffer';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';


export function useGetBidOffers(id:string) {
  return useQuery<any>({
    queryKey: ['bidOffers', id],
    queryFn:  () => getAllBidOffers(id),
    staleTime: 1000 * 60 * 5, // 5 mins,
  });
}

export function useGetABidOffer(id:string) {
  return useQuery<any>({
    queryKey: ['bidOffer-accepted', id],
    queryFn:  () => getABidOffer(id),
    staleTime: 1000 * 60 * 5, // 5 mins,
  });
}


export function useCreateBidOffer() {

    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ bidId, transporterId, offeredPrice, offerDate, message }: { bidId: string, transporterId: string, offeredPrice: number, offerDate: Date, message: string }) =>
        createBidOffer(bidId, transporterId, offeredPrice, offerDate, message),

      onSuccess: (_, {bidId }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['bidOffers', bidId] });
        toast.success("Bid offer created successfully");

      },
      onError: (error) => {
        toast.error("Error creating bid offer: " + error.message);
      }
    });
}




export function useUpdateBidOffer() {

    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, status, bidId }: { id: string, status: string, bidId :string}) =>
        updateBidOffer(id, status),

      onSuccess: (_, { bidId}) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['bidOffers', bidId] });
        toast.success("Bid offer updated successfully");

      },
      onError: (error) => {
        toast.error("Error updating bid offer: " + error.message);
      }
    });
}
