"use client"
import { LoginForm } from "@/components/Login";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login(){
   
    const router = useRouter();
    const [loggedUser , setLoggedUser] = useState<any>(null)
    useEffect(() => {

        
        auth.onAuthStateChanged(async(user) => {
            const tokenResult = await user?.getIdTokenResult();
            const role = tokenResult?.claims.role;

            if(user) {
                setLoggedUser(user)
                router.push(`/${role}`)
            } else {
                // User is not logged in, stay on the login page
                console.log("User is not logged in");
            }
        })
    })

    return (
        <div className="w-full border h-screen flex flex-col items-center justify-center gap-8 bg-[url(/bus.png)] rounded-lg">
            <h1 className="text-3xl text-white">Please Login</h1>
            <div className="w-[360px] border border-black/10 rounded-lg px-4 py-6 bg-white shadow-sm">
                {
                    !loggedUser ? <LoginForm/> : <div>Checking for Credentials</div>
                }
            </div>
        </div>
    )
}