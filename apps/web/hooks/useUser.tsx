import { createUser, getAllUsers, resetUserPassword, deleteUser } from '@/lib/api/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';


export function useGetUsers() {
  return useQuery<any>({
    queryKey: ['users'],
    queryFn:  () => getAllUsers(),
    staleTime: 1000 * 60 * 5, // 5 mins,
  });
}

export function useCreateUser() {

  
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({email, password }: { email: string, password: string }) =>
        createUser(email,password),

      onSuccess: (_, { email, password }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success("User created successfully");

      },
      onError: (error) => {
        console.log(error)
        toast.error("Error creating user");
      }
    });
}
  
export function useResetUserPassword() {

    
    
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({email, password }: { email: string, password: string }) =>
        resetUserPassword(email,password),

      onSuccess: (_, { email, password }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success("User password reset successfully");

      },
      onError: (error) => {
        console.log(error)
        toast.error("Error resetting user password");
      }
    });
}

export function useDeleteUser() {

    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({email }: { email: string }) =>
        deleteUser(email),
        
      onSuccess: (_, { email }) => {
        // Update the cache or refetch subscription status
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success("User deleted successfully");
      },
      onError(error, variables, context) {
        toast.error("Error deleting user: " + error.message);
      },
    });
}
