"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

// All possible fonts — you can add/remove as needed
const ALL_FONTS = [
  "Geist", "Pacifico", "Roboto", "Chewy", "Schoolbell", "Orbitron", "Cormorant_SC"
];

// Convert HEX → HSL
function hexToHsl(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export default function PostUploader() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [authorKey, setAuthorKey] = useState("");

  // Preferences UI
  const [colorHex, setColorHex] = useState("#6633ff");
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

    const hslColor = hexToHsl(colorHex);

    const preferences = {
      /*
      color: {
        hex: colorHex,
        hsl: hslColor,
      },*/
      font: selectedFont,

      hue: hue
    };

    const { error } = await supabase
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
      setColorHex("");
      setHue(180);
    }
  };

  return (
    <div className="">
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
      
        <label className="label">By submitting a post you agree to the <a href="terms" target="_blank">terms of service</a>.</label>

        <button
          type="submit"
          disabled={loading}
          className="button"
        >
          {loading ? "Saving..." : "Submit Post"}
        </button>
      </form>

      {message && <p className="">{message}</p>}
    </div>
  );
}
