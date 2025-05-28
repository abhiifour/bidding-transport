'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";



export default function Home() {
  console.log(process.env.NEXT_PUBLIC_MY_NAME)
  const router = useRouter()
  return (
    <div className=" w-[90%] mx-auto h-screen flex items-center ">
      <div className="bg-[url('/landing.png')] w-full h-[90%] bg-cover bg-no-repeat rounded-lg flex justify-end items-end p-6">
           <Button className="cursor-pointer" onClick={() => router.push("/login")}>Get Started</Button>
      </div>
 
    </div>
  );
}
