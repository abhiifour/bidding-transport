"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { toast } from "sonner"
import { useCreateBid } from "@/hooks/useBid"


const formSchema = z.object({
    materialType: z.string().min(4, {
        message: "Enter a valid material type",
    }),
    quantity: z.string().min(2, {
        message: "Enter a valid quantity",
    }),
    pickupLocation: z.string().min(2, {
    message: "Enter a valid location",
    }),
    deliveryLocation: z.string().min(2, {
    message: "Enter a valid location",
    }),
    deadline: z.date().min(new Date(), {
    message: "Enter a  deadline",
    }),
    requirement: z.string().min(0, {
    message: "any requirements",
    }),
})


export function CreateBidForm() {
  const {mutate , isError, isSuccess} = useCreateBid()
  const user = auth.currentUser
  const router = useRouter()
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      materialType: "",
      quantity: "",
      pickupLocation:"",
      deliveryLocation: "",
      deadline: new Date(),
      requirement: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutate({
      requirement: values.requirement,
      createdById: user?.uid ?? "", // Replace with actual user ID
      materialType: values.materialType,
      quantity: parseInt(values.quantity, 10),
      pickupLocation: values.pickupLocation,
      deliveryLocation: values.deliveryLocation,
      deadline: values.deadline
    })
    console.log(values)
    // loginUser(values.email, values.password)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col ">
        <FormField
          control={form.control}
          name="materialType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material Type</FormLabel>
              <FormControl>
                <Input placeholder="Bricks" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pickupLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pickup Location</FormLabel>
              <FormControl>
                <Input placeholder="delhi" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="deliveryLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Location</FormLabel>
              <FormControl>
                <Input placeholder="Mumbai" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />



        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <FormControl>
                <Input   type="date"
                  placeholder="Select a date"
                  value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                  onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                   />
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="requirement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirement</FormLabel>
              <FormControl>
                <Input placeholder="anything" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer px-8 py-1">Create</Button>
      </form>
    </Form>
  )
}
