import { LoginForm } from "@/components/Login";

export default function Login(){

    return (
        <div className="w-full border h-screen flex flex-col items-center justify-center gap-8">
            <h1 className="text-3xl ">Please Login</h1>
            <div className="w-[360px] border border-black/10 rounded-lg px-4 py-6">
                <LoginForm/>
            </div>
        </div>
    )
}