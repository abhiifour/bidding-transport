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
import { useCreateManualDeal } from "@/hooks/useDeal"
import { auth } from "@/lib/firebase"



const formSchema = z.object({
  materialType: z.string().min(4, {
    message: "Enter a valid material type",
  }),
  quantity: z.coerce.number().min(1, {
    message: "Enter a valid quantity",
  }),
  amount: z.coerce.number().min(1, {
    message: "Enter a valid amount",
  }),
  transporterId: z.string().min(2, {
    message: "Enter a valid transporter ID",
  }),
  dealDate: z.date()
})


export function CreateManualDeal() {
  
  const {mutate , isError, isSuccess} = useCreateManualDeal()
  const router = useRouter()
  const user = auth.currentUser
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      materialType: "",
      quantity: 0,
      amount:0,
      transporterId: "",
      dealDate: new Date(),
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutate({
      materialType: values.materialType,
      quantity: values.quantity,
      amount: values.amount,
      transporterId: values.transporterId,
      dealDate: values.dealDate,
      loggedById: user?.uid ?? ""
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="delhi" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="transporterId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transporter Id</FormLabel>
              <FormControl>
                <Input placeholder="Mumbai" {...field} />
              </FormControl>
          
              <FormMessage />
            </FormItem>
          )}
        />



        <FormField
          control={form.control}
          name="dealDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deal Date</FormLabel>
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

        <Button type="submit" className="cursor-pointer px-8 py-1">Create</Button>
      </form>
    </Form>
  )
}
