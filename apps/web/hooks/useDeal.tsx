import { createManualDeal, deleteManualDeal, editManualDeal, getAllDeals, getAllManualDeals } from '@/lib/api/deal';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';


export function useGetDeals() {
  return useQuery<any>({
    queryKey: ['deals'],
    queryFn:  () => getAllDeals(),
    staleTime: 1000 * 60 * 5, // 5 mins,
  });
}



export function useGetManualDeals() {
  return useQuery<any>({
    queryKey: ['manualDeals'],
    queryFn:  () => getAllManualDeals(),
    staleTime: 1000 * 60 * 5, // 5 mins,
  });
}

           

export function useCreateManualDeal() {

  
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ transporterId, loggedById, materialType, amount, quantity, dealDate }: { transporterId: string, loggedById: string, materialType: string, amount: number, quantity: number, dealDate: Date }) =>
        createManualDeal(transporterId, loggedById, materialType, amount, quantity, dealDate),

      onSuccess: (_, { }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['manualDeals'] });
        toast.success("manual deal added")

      },
      onError: (error) => {
        toast.error("Error creating manual deal: " + error.message);
      }
    });
}


export function useEditManualDeal() {

  
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ transporterId, loggedById, materialType, amount, quantity, dealDate, id }: { transporterId: string, loggedById: string, materialType: string, amount:number, quantity: number, dealDate: Date, id: string }) =>
        editManualDeal(id, transporterId, loggedById, materialType, amount, quantity, dealDate),

      onSuccess: (_, { }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['manualDeals'] });
        toast.success("manual deal updated")

      },
      onError: (error) => {
        toast.error("Error updating manual deal: " + error.message);
      }
    });
}
  
export function useDeleteManualDeal() {

    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({id }: { id: string }) =>
        deleteManualDeal(id),
        
      onSuccess: (_, { id }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['manualDeals'] });
        toast.success("Manual deal deleted successfully");
      },
      onError(error, variables, context) {
        toast.error("Error deleting manual deal: " + error.message);
      },
    });
}

