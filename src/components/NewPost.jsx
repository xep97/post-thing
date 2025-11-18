"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PostUploader() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [authorKey, setAuthorKey] = useState("");
  const [preferences, setPreferences] = useState("{}"); // JSON string
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Generate or load authorKey on first render
  useEffect(() => {
    let storedKey = localStorage.getItem("authorKey");
    if (!storedKey) {
      storedKey = crypto.randomUUID();
      localStorage.setItem("authorKey", storedKey);
    }
    setAuthorKey(storedKey);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    let parsedPreferences = null;

    try {
      parsedPreferences = preferences ? JSON.parse(preferences) : null;
    } catch (err) {
      setMessage("❌ Preferences must be valid JSON");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("posts")
      .insert([
        {
          name,
          content,
          available_from: availableFrom ? new Date(availableFrom).toISOString() : null,
          available_to: availableTo ? new Date(availableTo).toISOString() : null,
          author_key: authorKey,
          preferences: parsedPreferences
        }
      ]);

    setLoading(false);

    if (error) {
      setMessage("❌ Error: " + error.message);
    } else {
      setMessage("✅ Post saved!");
      setName("");
      setContent("");
      setAvailableFrom("");
      setAvailableTo("");
      setPreferences("{}");
      // Keep the authorKey the same for next post
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Create Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          required
        />

        <div>
          <label className="block mb-1">Available From</label>
          <input
            type="datetime-local"
            className="w-full p-2 border rounded"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Available To</label>
          <input
            type="datetime-local"
            className="w-full p-2 border rounded"
            value={availableTo}
            onChange={(e) => setAvailableTo(e.target.value)}
          />
        </div>

        <input
          type="text"
          className="w-full p-2 border rounded bg-gray-100"
          placeholder="Author Key"
          value={authorKey}
          onChange={(e) => {
            setAuthorKey(e.target.value);
            localStorage.setItem("authorKey", e.target.value); // save changes if user edits
          }}
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder='Preferences (JSON), e.g. {"color":"blue"}'
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          rows={3}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Submit Post"}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
