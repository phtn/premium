"use client";
import { auth } from "@/lib/firebase/config";
import { useAuthState } from "@/utils/hooks/authState";
import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";
import { AdminBoard } from "./content";
import { Loader } from "@/components/ui/loader";

export default function AdminLayout({ children }: PropsWithChildren) {
  const { user, loading } = useAuthState(auth);
  if (loading) return <Loader sm label="Authorizing..." />;
  if (!!loading && user?.email !== "phtn458@gmail.com") {
    return redirect("/");
  } else {
    return <AdminBoard>{children}</AdminBoard>;
  }
}
