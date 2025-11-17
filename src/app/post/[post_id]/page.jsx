import PostClient from "./PostClient";

export default function Page({ params }) {
  // params is NOT a Promise here — safe to read
  const { post_id } = params;

  return <PostClient post_id={post_id} />;
}


