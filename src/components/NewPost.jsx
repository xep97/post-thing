"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

// All possible fonts — you can add/remove as needed
const ALL_FONTS = [
  "Inter", "Roboto", "Montserrat", "Lato", "Poppins",
  "Open Sans", "Oswald", "Raleway", "Merriweather",
  "Playfair Display", "Nunito", "Josefin Sans",
  "PT Serif", "Karla", "Rubik", "Source Sans Pro",
  "Work Sans", "Titillium Web", "Cabin", "Quicksand"
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
      color: {
        hex: colorHex,
        hsl: hslColor,
      },
      font: selectedFont,
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
      setColorHex("#6633ff");
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
            localStorage.setItem("authorKey", e.target.value);
          }}
        />

        {/* Preferences UI */}
        <div className="p-3 border rounded">
          <h3 className="font-medium mb-2">Preferences</h3>

          {/* Color Picker */}
          <label className="block mb-1">Choose Color</label>
          <input
            type="color"
            value={colorHex}
            onChange={(e) => setColorHex(e.target.value)}
            className="w-20 h-10 p-1 cursor-pointer border rounded mb-3"
          />

          {/* Font Selector */}
          <label className="block mb-1 mt-2">Choose Font</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

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
