"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PostClient({ post_id }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState("");

  // Fetch post by UUID
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("post_id", post_id)
        .single();

      if (!error) setPost(data);
      setLoading(false);
      

    };

    load();
  }, [post_id]);
  

  // Countdown logic
  useEffect(() => {
    
    if (!post) return;

    const from = post.available_from ? new Date(post.available_from) : null;
    const to = post.available_to ? new Date(post.available_to) : null;

    const update = () => {
      const now = new Date();

      let target =
        from && now < from     // if start time hasn't happened yet
          ? from
          : to                 // else count down to available_to
          ? to
          : null;

      if (!target) {
        setCountdown("No countdown available");
        return;
      }

      const diff = target - now;
      if (diff <= 0) {
        setCountdown("Expired");
        return;
      }

      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / 60 / 1000) % 60;
      const hours   = Math.floor(diff / 1000 / 60 / 60) % 24;
      const days    = Math.floor(diff / 1000 / 60 / 60 / 24);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [post]);

  if (loading) return <p>Loading…</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-4 border rounded space-y-4">
      <h1 className="text-3xl font-bold">{post.name}</h1>
      <p className="text-lg">{post.content}</p>

      <div>
        <strong>Preferences:</strong>
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(post.preferences, null, 2)}
        </pre>
      </div>

      <p className="text-blue-600 font-semibold text-lg">
        Countdown: {countdown}
      </p>
    </div>
  );
}
