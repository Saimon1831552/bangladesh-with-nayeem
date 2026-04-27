"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, ADMIN_EMAILS } from "@/lib/firebase";
import TravelAdminDashboard from "./dashboard";

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user && ADMIN_EMAILS.includes(user.email)) {
        setAuthed(true);
      } else {
        router.replace("/dashboard/login");
      }
    });
    return unsub;
  }, [router]);

  if (!authed) return null;

  return <TravelAdminDashboard />;
}