"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

// All possible fonts — you can add/remove as needed
const ALL_FONTS = [
  "Geist", "Pacifico", "Roboto", "Chewy", "Schoolbell", "Orbitron", "Cormorant_SC"
];


export default function PostUploader() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [authorKey, setAuthorKey] = useState("");

  // Preferences UI
  const [fontOptions, setFontOptions] = useState([]);
  const [selectedFont, setSelectedFont] = useState("");

  // 🌈 NEW: hue slider 0–360
  const [hue, setHue] = useState(180);
  // Update CSS variable when hue changes
    useEffect(() => {
      document.documentElement.style.setProperty("--hue", hue);
    }, [hue]);


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let storedKey = localStorage.getItem("authorKey");
    if (!storedKey) {
      storedKey = crypto.randomUUID();
      localStorage.setItem("authorKey", storedKey);
    }
    setAuthorKey(storedKey);
  }, []);

  // Pick 10 random fonts
  useEffect(() => {
    const shuffled = [...ALL_FONTS].sort(() => 0.5 - Math.random());
    const randomTen = shuffled.slice(0, 10);
    setFontOptions(randomTen);
    setSelectedFont(randomTen[0]);
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  const preferences = {
    font: selectedFont,
    hue: hue
  };

  // Add .select() to return the inserted row
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        name,
        content,
        available_from: availableFrom ? new Date(availableFrom).toISOString() : null,
        available_to: availableTo ? new Date(availableTo).toISOString() : null,
        author_key: authorKey,
        preferences: preferences
      }
    ])
    .select() // returns the inserted row(s)
    .single(); // ensures only one row

  setLoading(false);

  if (error) {
    setMessage("❌ Error: " + error.message);
  } else {
    const postUrl = `/posts/${data.post_id}`;
    setMessage(
      <span>
        ✅ Post saved!{" "}
        <a href={postUrl} className="">
          View Post
        </a>
      </span>
    );

    // Clear form
    setName("");
    setContent("");
    setAvailableFrom("");
    setAvailableTo("");
    setHue(180);
  }

};


  return (
    <div className="main-list">
      <form onSubmit={handleSubmit} className="new-post">

        <input
          type="text"
          className="input-text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ fontFamily: selectedFont }}
          required
        />

        <textarea
          className="textarea"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          style={{ fontFamily: selectedFont }}
          required
        />

        <label className="label">Available From</label>
        <input
          type="datetime-local"
          className="input-date"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
          required
        />
      
        <label className="label">Available To</label>
        <input
          type="datetime-local"
          className="input-date"
          value={availableTo}
          onChange={(e) => setAvailableTo(e.target.value)}
          required
        />
        
        <label className="label">Your user ID. Save it and/or replace it to login with another account.</label>
        <input
          type="text"
          className="input-text"
          placeholder="Author Key"
          value={authorKey}
          onChange={(e) => {
            setAuthorKey(e.target.value);
            localStorage.setItem("authorKey", e.target.value);
          }}
        />
  

        {/* 🌈 HUE SLIDER */}
        <label className="label">Choose color</label>
        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={(e) => setHue(Number(e.target.value))}
          className="input-slider"
        />

        {/* Font Selector */}
        <label className="">Choose Font</label>
        <select
          className="input-select"
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
        >
          {fontOptions.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      
        <label className="label">By submitting a post you agree to the <a href="terms" target="_blank">terms of use</a>.</label>

        <button
          type="submit"
          disabled={loading}
          className="button"
        >
          {loading ? "Saving..." : "Submit Post"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
