"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const EXPECTED_PASSWORD = process.env.NEXT_PUBLIC_APP_PASSWORD;

    if (password === EXPECTED_PASSWORD) {
      localStorage.setItem("auth", "true");
      router.push("/create");
    } else {
      setError("Wrong password");
    }
  };

  return (
    <div className="new-post">
      <h1>Login</h1>
      <p>Enter access code to post</p>
      <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-text"
          placeholder="Enter access code"
        />
        <button className="button" type="submit">Login</button>
      </form>
      {error && <p style={{ color:"red" }}>{error}</p>}
    </div>
  );
}
