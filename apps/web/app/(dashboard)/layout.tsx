"use client"
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [role, setRole] = useState("");
  const [tab, setTab] = useState("");
  const path = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut()
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    router.push("/");
  }

  useEffect(() => {
    const getRole = localStorage.getItem("role");
    if (getRole) {
      setRole(getRole);
      setTab(getRole === "admin" ? "deals" : "bids");
    }
  }, []);

  return (
    <div className="w-[1000px] mx-auto mt-8">
      {role === "admin" && (
       <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-4 text-xl">
          <p
            onClick={() => {
              router.push(`/admin/staffs`);
              setTab("staffs");
            }}
            className={`${tab === "staffs" ? "underline underline-offset-4" : ""} cursor-pointer`}
          >
            Staffs
          </p>
          <p
            onClick={() => {
              router.push(`/admin/transporters`);
              setTab("transporters");
            }}
            className={`${tab === "transporters" ? "underline underline-offset-4" : ""} cursor-pointer`}
          >
            Transporters
          </p>
          <p
            onClick={() => {
              router.push(`/admin`);
              setTab("deals");
            }}
            className={`${tab === "deals" ? "underline underline-offset-4" : ""} cursor-pointer`}
          >
            Deals
          </p>
        </div>
        <Button onClick={handleLogout} className="bg-black/10  text-black hover:bg-black hover:text-white">Logout</Button>
       </div>
      )}

      {role === "staff" && (
       <div className="flex justify-between items-center">
         <div className="text-xl flex justify-start items-center gap-4">
          <p
            onClick={() => {
              router.push(`/staff`);
              setTab("bids");
            }}
            className={`${tab === "bids" ? "underline underline-offset-4" : ""} cursor-pointer`}
          >
            Bids
          </p>
          <p
            onClick={() => {
              router.push(`/staff/manual-deals`);
              setTab("manual-deals");
            }}
            className={`${tab === "manual-deals" ? "underline underline-offset-4" : ""} cursor-pointer`}
          >
            Manual Deals
          </p>
        </div>
        <Button onClick={handleLogout} className="bg-black/10  text-black hover:bg-black hover:text-white">Logout</Button>
       </div>
      )}

      <div className="mt-10">{children}</div>
    </div>
  );
}
