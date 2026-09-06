const express = require("express");
const axios = require("axios");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const METABASE_SITE_URL = "https://fictional-trout-97qp5jvp9rpqfx459-3000.app.github.dev";
const METABASE_SECRET_KEY = "49e0e32912514be7b07a93753bbc1f6469c11ac1381c3c88a5479f6b9f9d4f41";

const DASHBOARD_IDS = {
  Leader: 2,
  Manager: 8,
  ProjectLead: 9
};

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/ai-narrative", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing 'prompt' in request body" });
  }
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3.1",
      prompt: prompt,
      stream: false
    });
    res.json({ text: response.data.response });
  } catch (err) {
    console.error("Ollama call failed:", err.message);
    res.status(500).json({ error: "Ollama generation failed", detail: err.message });
  }
});

function issueToken(res, role) {
  const payload = {
    resource: { dashboard: DASHBOARD_IDS[role] },
    params: {},
    exp: Math.round(Date.now() / 1000) + 600
  };
  const token = jwt.sign(payload, METABASE_SECRET_KEY);
  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;
  res.json({ iframeUrl });
}

app.post("/api/embed-token/leader", (req, res) => {
  issueToken(res, "Leader");
});

app.post("/api/embed-token/manager", (req, res) => {
  issueToken(res, "Manager");
});

app.post("/api/embed-token/projectlead", (req, res) => {
  issueToken(res, "ProjectLead");
});

const PORT = 4000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`AI proxy + embed-token server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
