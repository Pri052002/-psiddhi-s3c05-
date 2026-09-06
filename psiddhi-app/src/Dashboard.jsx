import { useState, useEffect } from "react";
import axios from "axios";
import AINarrative from "./AINarrative";

const EMBED_TOKEN_URL = "https://fictional-trout-97qp5jvp9rpqfx459-4000.app.github.dev/api/embed-token";

function Dashboard({ role }) {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!role) {
      setLoading(false);
      return;
    }

    const fetchEmbedUrl = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.post(`${EMBED_TOKEN_URL}/${role.toLowerCase()}`);
        setUrl(res.data.iframeUrl);
      } catch (err) {
        console.error("Failed to fetch signed embed URL:", err.message);
        setError("Could not load report. Please try again.");
      }
      setLoading(false);
    };

    fetchEmbedUrl();
  }, [role]);

  if (!role) {
    return (
      <div style={{ padding: "2rem", background: "#fff", borderRadius: "8px" }}>
        <p style={{ color: "#c00" }}>
          ⚠️ No role assigned to your account. Contact your administrator.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>{role} Dashboard</h2>

      <div style={{ background: "#fff", borderRadius: "8px",
                    padding: "1rem", marginBottom: "1rem",
                    border: "1px solid #e0e0e0", minHeight: "400px" }}>
        {loading ? (
          <p style={{ color: "#888", textAlign: "center", padding: "2rem" }}>
            Loading report...
          </p>
        ) : error ? (
          <p style={{ color: "#c00", textAlign: "center", padding: "2rem" }}>
            {error}
          </p>
        ) : url ? (
          <iframe
            src={url}
            width="100%"
            height="500"
            style={{ border: "none", borderRadius: "6px" }}
            title={`${role} Report`}
          />
        ) : (
          <p style={{ color: "#888", textAlign: "center", padding: "2rem" }}>
            Report not yet configured for this role.
          </p>
        )}
      </div>

      <AINarrative role={role} reportName={`${role} Dashboard`} />
    </div>
  );
}

export default Dashboard;
