"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PostCard({ post, onDeleted }) {
  const [countdown, setCountdown] = useState("");
  const [isVisible, setIsVisible] = useState(false);
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
        setIsVisible(false);
      } else if (fromTime && toTime && now >= fromTime && now <= toTime) {
        setCountdown(`Expires in: ${formatDiff(toTime - now)}`);
        setIsVisible(true);
      } else if (toTime && now > toTime) {
        setCountdown("Post is gone");
        setIsVisible(false);
      } else {
        setCountdown("");
        setIsVisible(false);
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
      if (onDeleted) onDeleted(post.post_id); // optional callback to remove from list
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      {isVisible && (
        <>
          <h2 className="text-xl font-semibold">{post.name}</h2>
          <p className="mt-2">{post.content}</p>
        </>
      )}
      <div className="mt-4 text-blue-600 font-semibold">{countdown}</div>

      {/* Show delete button only if authorKey matches */}
      {authorKey && post.author_key === authorKey && (
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
