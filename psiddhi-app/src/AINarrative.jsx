import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function AINarrative({ role, reportName }) {
  const [narrative, setNarrative] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateNarrative = async () => {
    setLoading(true);
    setError("");
    setNarrative("");

    const prompt = `You are a data analyst assistant for a workforce analytics platform.
The user is a ${role}. They are viewing the "${reportName}" report.

Provide a structured response with exactly these 3 sections:

1. CONTEXTUAL SUMMARY (3 sentences):
Write a role-specific summary of what this report shows for a ${role}.

2. ANOMALY CALLOUTS (2 bullet points):
List 2 specific things a ${role} should watch out for in this report.

3. DECISION PROMPTS (2 bullet points):
List 2 action-oriented questions this ${role} should consider after viewing this report.

Be concise, specific, and role-appropriate.`;

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
      const res = await axios.post(url, {
        contents: [{ parts: [{ text: prompt }] }]
      });
      const text = res.data.candidates[0].content.parts[0].text;
      setNarrative(text);
    } catch (err) {
      setError("Failed to generate narrative. Check your Gemini API key in .env file.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ background: "#fff", borderRadius: "8px", padding: "1.5rem",
                  border: "1px solid #e0e0e0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                    marginBottom: "1rem" }}>
        <h3 style={{ margin: 0, fontSize: "15px" }}>
          🤖 AI Narrative — {role} View
        </h3>
        <button
          onClick={generateNarrative}
          disabled={loading}
          style={{ padding: "8px 18px", background: loading ? "#ccc" : "#1D9E75",
                   color: "#fff", border: "none", borderRadius: "6px",
                   cursor: loading ? "not-allowed" : "pointer", fontSize: "13px" }}>
          {loading ? "Generating..." : "Generate AI Summary"}
        </button>
      </div>

      {error && (
        <p style={{ color: "#c00", fontSize: "12px" }}>{error}</p>
      )}

      {narrative && (
  <div style={{ fontSize: "13px", lineHeight: "1.7", color: "#333",
                background: "#f9f9f9",
                borderRadius: "6px", padding: "1rem" }}>
    <ReactMarkdown>{narrative}</ReactMarkdown>
  </div>
)}

      {!narrative && !loading && !error && (
        <p style={{ color: "#aaa", fontSize: "12px" }}>
          Click "Generate AI Summary" to get a role-specific narrative for this report.
        </p>
      )}
    </div>
  );
}

export default AINarrative;
