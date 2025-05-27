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
  email: z.string().min(4, {
    message: "Enter a valid email",
  }),
  password: z.string().min(4, {
    message: "Enter a valid password",
  }),
})


export function LoginForm() {
 
  const router = useRouter()
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values)
    loginUser(values.email, values.password)
  }

  const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        // console.log(user)
        const user = userCredential.user;

        const tokenResult = await user.getIdTokenResult();
        const role = tokenResult.claims.role;
        
        if(role === "staff"){
            toast("logged in as staff")
            localStorage.setItem("role",role)
            router.push("/staff")
        }
        else if(role === "admin"){
            toast("logged in as admin")
            localStorage.setItem("role",role)
            router.push("/admin")
        }
        else{
            toast("user does not exist")
            router.push("/login")
        }
    } catch (error) {
        toast("invalid credentials")
        console.log(error)
    }
 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="staff@makebid.com" {...field} />
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="makebid123" {...field} />
              </FormControl>
              <FormDescription>
                This is your password provided by the admin
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer px-8 py-1">Login</Button>
      </form>
    </Form>
  )
}
