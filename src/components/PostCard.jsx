"use client";

import { useState, useEffect } from "react";


export default function PostCard({ post }) {
  const [countdown, setCountdown] = useState("");

  const fromTime = post.available_from ? new Date(post.available_from) : null;
  const toTime = post.available_to ? new Date(post.available_to) : null;

  // Countdown logic
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      let target =
        fromTime && now < fromTime
          ? fromTime
          : toTime
          ? toTime
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
      const minutes = Math.floor(diff / 1000 / 60) % 60;
      const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
      const days = Math.floor(diff / 1000 / 60 / 60 / 24);

      setCountdown(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [post]);

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{post.name}</h2>
      <p className="mt-2">{post.content}</p>

      <div className="mt-2">
        <strong>Preferences:</strong>
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(post.preferences, null, 2)}
        </pre>
      </div>

      <div className="mt-4 text-blue-600 font-semibold">
        Countdown: {countdown}
      </div>
    </div>
  );
}
