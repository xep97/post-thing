"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostRedirectPage() {
  const [postId, setPostId] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postId) return;

    // Redirect to /posts/[id]
    router.push(`/posts/${postId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Go to a Post</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Go
        </button>
      </form>
    </div>
  );
}
