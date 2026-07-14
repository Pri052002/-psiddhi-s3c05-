import AINarrative from "./AINarrative";

function Dashboard({ role }) {

  const reportUrls = {
    Leader:      "https://fictional-trout-97qp5jvp9rpqfx459-3000.app.github.dev/public/dashboard/ed55ce39-6455-4b9c-babf-d3cfc351e10f",
    Manager:     null,
    ProjectLead: null,
  };

  const url = reportUrls[role];

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
        {url ? (
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