"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Next.js hook to get URL params
import { supabase } from "@/lib/supabaseClient";
import PostCard from "@/components/PostCard.jsx";

export default function PostPage() {
  const { id } = useParams(); // grabs the dynamic route param
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("post_id", id) // assuming your DB column is post_id UUID
        .single(); // ensures only one row is returned

      if (error) {
        setError(error.message);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (!id) {
    return <div>Invalid post URL — missing id.</div>;
  }

  if (loading) return <p>Loading…</p>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found.</div>;

  return (
    <div className="post-list">
      <PostCard post={post} />
    </div>
  );
}
