"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PostCard({ post, onDeleted }) {
  const [countdown, setCountdown] = useState("");
  const [authorKey, setAuthorKey] = useState("");
  const [loading, setLoading] = useState(false);

  const fromTime = post.available_from ? new Date(post.available_from) : null;
  const toTime = post.available_to ? new Date(post.available_to) : null;

  useEffect(() => {
    // Get authorKey from localStorage
    const storedKey = localStorage.getItem("authorKey");
    if (storedKey) setAuthorKey(storedKey);

    const updateCountdown = () => {
      const now = new Date();

      if (fromTime && now < fromTime) {
        setCountdown(`Available in: ${formatDiff(fromTime - now)}`);
      } else if (fromTime && toTime && now >= fromTime && now <= toTime) {
        setCountdown(`Expires in: ${formatDiff(toTime - now)}`);
      } else if (toTime && now > toTime) {
        setCountdown("Post is gone");
      } else {
        setCountdown("");
      }
    };

    const formatDiff = (diff) => {
      if (diff <= 0) return "0s";
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [post]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setLoading(true);

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("post_id", post.post_id);

    setLoading(false);

    if (error) {
      alert("Error deleting post: " + error.message);
    } else {
      alert("Post deleted successfully!");
      if (onDeleted) onDeleted(post.post_id);
    }
  };

  const now = new Date();
  const isAuthor = authorKey && post.author_key === authorKey;
  const isActive = fromTime && toTime && now >= fromTime && now <= toTime;

  // Show name/content if active or if user is the author
  const showContent = isActive || isAuthor;

  return (
    <div className="border p-4 rounded shadow">
      {showContent && (
        <>
          <h2 className="text-xl font-semibold">{post.name}</h2>
          <p className="mt-2">{post.content}</p>
        </>
      )}

      {/* Countdown always visible */}
      <div className="mt-4 text-blue-600 font-semibold">{countdown}</div>

      {/* Delete button only for author */}
      {isAuthor && (
        <button
          onClick={handleDelete}
          disabled={loading}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      )}
    </div>
  );
}
