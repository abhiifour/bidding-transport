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

    console.log(values)
    // loginUser(values.email, values.password)
  }

//   const loginUser = async (email: string, password: string) => {
//     try {
//         const userCredential = await signInWithEmailAndPassword(auth,email,password);
//         // console.log(user)
//         const user = userCredential.user;

//         const tokenResult = await user.getIdTokenResult();
//         const role = tokenResult.claims.role;
        
//         if(role === "staff"){
//             toast("logged in as staff")
//             router.push("/staff")
//         }
//         else if(role === "admin"){
//             toast("logged in as admin")
//             router.push("/admin")
//         }
//         else{
//             toast("user does not exist")
//             router.push("/login")
//         }
//     } catch (error) {
//         toast("invalid credentials")
//         console.log(error)
//     }
 
//   }

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
              <FormDescription>
                This is your email provided by the admin
              </FormDescription>
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
              <FormDescription>
                This is your password provided by the admin
              </FormDescription>
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
              <FormDescription>
                This is your password provided by the admin
              </FormDescription>
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
              <FormDescription>
                This is your password provided by the admin
              </FormDescription>
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
              <FormDescription>
                This is your password provided by the admin
              </FormDescription>
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
              <FormDescription>
                This is your password provided by the admin
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer px-8 py-1">Create</Button>
      </form>
    </Form>
  )
}
