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
import { useCreateUser, useResetUserPassword } from "@/hooks/useUser"


const formSchema = z.object({
  email: z.string().min(4, {
    message: "Enter a valid email",
  }),
  password: z.string().min(4, {
    message: "Enter a valid password",
  }),
})


export function ResetUserForm({email}: {email: string}) {
  const {mutate, isError, isPending, isSuccess} = useResetUserPassword()
  const router = useRouter()
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      password: ''
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
 

    mutate({
      email: values.email,
      password: values.password,
    })

    // loginUser(values.email, values.password)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="staff@makebid.com" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="makebid123" {...field} />
              </FormControl>
         
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="cursor-pointer px-8 py-1">Reset Password</Button>
      </form>
    </Form>
  )
}
