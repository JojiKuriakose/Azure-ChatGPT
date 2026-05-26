import React from "react";
import type { Mode } from "../types";

export const ModeSelector: React.FC<{
  mode: Mode;
  onChange: (mode: Mode) => void;
}> = ({ mode, onChange }) => (
  <div className="mb-4">
    <label className="mr-2 font-medium text-sm">Mode:</label>
    <select
      className="border px-2 py-1 rounded text-sm"
      value={mode}
      onChange={(e) => onChange(e.target.value as Mode)}
    >
      <option value="global">🌐 Global Search</option>
      <option value="custom">📁 Custom Search(RAG)</option>
      <option value="image">🖼️ Generate Image</option>
    </select>
  </div>
);