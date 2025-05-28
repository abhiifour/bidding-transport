"use client";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<"staff" | "user" | "">( "");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async(user) => {
            if (!user) {
                router.push("/login");
                return;
            }

            const tokenResult = await user.getIdTokenResult();
            const role = tokenResult?.claims.role as "staff" | "user" | "";
            setRole(role);
            setLoading(false);

            if(role !== "staff") {
                router.push(`/${role}`);
            } 
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) return <div>Loading...</div>;
    if (role !== "staff") return <div>Don't be smart</div>;

    return (
        <div >
         
            <main >{children}</main>
        </div>
    );
}
