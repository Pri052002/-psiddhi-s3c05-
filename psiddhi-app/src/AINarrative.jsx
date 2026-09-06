import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const FALLBACK_NARRATIVES = {
  Leader: `**Contextual Summary**
This view aggregates organization-wide performance across all regions and teams. Overall output and target-vs-actuals trends remain within expected ranges, with headcount distribution stable across the last reporting period.

**Anomaly Callouts**
- One or more regions may be trending below the 4-week rolling average — review the Trend Analysis panel for early signals.
- Cross-team SLA adherence shows the widest variance at the organization level; worth a closer look if it dips further.

**Decision Prompts**
- Which region needs reallocation of resources this cycle based on output-vs-target gaps?
- Should org-wide targets be revised given current headcount and output trends?`,

  Manager: `**Contextual Summary**
This view is scoped to your region only. Team performance and task completion rates reflect your Mac_id's data, filtered from the unified workforce dataset. Regional output tracks against target with team-level detail available on drill-through.

**Anomaly Callouts**
- Watch for any team within your region falling behind SLA adherence relative to the regional average.
- Workload distribution across your teams may be uneven — check for teams carrying disproportionate task volume.

**Decision Prompts**
- Which team in your region needs support to hit this period's targets?
- Is workload balanced fairly across your teams, or does it need rebalancing?`,

  ProjectLead: `**Contextual Summary**
This view is scoped to your team only. Task completion rates and trend data reflect your team_id's activity, isolated from other teams' data. Recent trend shows your team's output relative to its own historical baseline.

**Anomaly Callouts**
- Any sudden dip in your team's task completion rate versus its own 4-week average is worth flagging early.
- Individual workload spikes within your team can precede missed SLAs — monitor before they compound.

**Decision Prompts**
- Does any team member need reprioritization based on current task load?
- Is your team on pace against this cycle's target, or does the plan need adjusting?`
};

function AINarrative({ role, reportName }) {
  const [narrative, setNarrative] = useState("");
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");

  const generateNarrative = async () => {
    setLoading(true);

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
      const proxyUrl = "https://fictional-trout-97qp5jvp9rpqfx459-4000.app.github.dev/api/ai-narrative";
      const res = await axios.post(proxyUrl, { prompt });
      setNarrative(res.data.text);
      setSource("live");
    } catch (err) {
      console.error("Live AI generation failed, using fallback:", err.message);
      setNarrative(FALLBACK_NARRATIVES[role] || FALLBACK_NARRATIVES.Leader);
      setSource("fallback");
    }
    setLoading(false);
  };

  useEffect(() => {
    generateNarrative();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, reportName]);

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
          {loading ? "Generating..." : "Regenerate"}
        </button>
      </div>

      {loading && !narrative && (
        <p style={{ color: "#aaa", fontSize: "12px" }}>Generating narrative...</p>
      )}

      {narrative && (
        <div style={{ fontSize: "13px", lineHeight: "1.7", color: "#333",
                      background: "#f9f9f9",
                      borderRadius: "6px", padding: "1rem" }}>
          <ReactMarkdown>{narrative}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default AINarrative;
