"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
      setAuthenticated(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!authenticated) return null;

  return children;
}
