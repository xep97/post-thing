"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PostCard from "@/components/PostCard.jsx";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts once
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("id", { ascending: false });

      if (!error) setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      {loading && <p>Loading…</p>}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
