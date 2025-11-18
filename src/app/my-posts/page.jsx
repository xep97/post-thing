"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PostCard from "@/components/PostCard.jsx";

export default function MyPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorKey, setAuthorKey] = useState("");

  useEffect(() => {
    // Get the authorKey from localStorage
    const storedKey = localStorage.getItem("authorKey");
    if (!storedKey) {
      console.warn("No authorKey found in localStorage");
      setLoading(false);
      return;
    }
    setAuthorKey(storedKey);

    const fetchPosts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("author_key", storedKey) // filter by author_key
        .order("available_from", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (!authorKey) return <p>No author key found. Cannot fetch posts.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">My Posts</h1>

      {posts.length === 0 && <p>No posts found for this author.</p>}

      {posts.map((post) => (
        <PostCard key={post.post_id} post={post} />
      ))}
    </div>
  );
}
