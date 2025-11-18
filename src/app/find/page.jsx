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
    <div className="post-page">
      <h1 className="page-title">Go to post</h1>

      <form onSubmit={handleSubmit} className="new-post">
        <input
          type="text"
          placeholder="Enter Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="input-text"
        />
        <button
          type="submit"
          className="button"
        >
          Go
        </button>
      </form>
    </div>
  );
}
