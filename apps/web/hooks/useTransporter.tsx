import { createTransporter, deleteTransporter, editTransporter, getAllTransporters } from '@/lib/api/transporter';
import { createUser, getAllUsers, resetUserPassword, deleteUser } from '@/lib/api/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';


export function useGetTransporter() {
  return useQuery<any>({
    queryKey: ['transporters'],
    queryFn:  () => getAllTransporters(),
    staleTime: 1000 * 60 * 5, // 5 mins,
  });
}

export function useCreateTransporter() {

  
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({name, contact, vehicleType, capacity }: { name: string, contact: string, vehicleType: string, capacity: number }) =>
        createTransporter(name, contact, vehicleType, capacity),

      onSuccess: (_, { }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['transporters'] });
        toast.success("Transporter created successfully");
      },
      onError: (error) => {
        toast.error("Error creating transporter: " + error.message);
      }
    });
}
  
export function useEditTransporter() {

    
    
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({name, contact, vehicleType, capacity, id, status }: { name: string, contact: string, vehicleType: string, capacity: number, id:string, status: string }) =>
        editTransporter(name, contact, vehicleType, capacity, id, status),

      onSuccess: (_, { }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['transporters'] });
        toast.success("Transporter edited successfully");
      },
      onError: (error) => {
        toast.error("Error editing transporter: " + error.message);
      }
    });
}

export function useDeleteTransporter() {

    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({id }: { id: string }) =>
        deleteTransporter(id),

      onSuccess: (_, {  }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['transporters'] });
        toast.success("Transporter deleted successfully");
      },
      onError(error, variables, context) {
        toast.error("Error deleting transporter: " + error.message);
      },
    });
}
