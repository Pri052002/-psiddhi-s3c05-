import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Dashboard from "./Dashboard";

function App() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
  instance.loginRedirect(loginRequest).catch((e) => console.error(e));
};

  const handleLogout = () => {
  instance.logoutRedirect().catch((e) => console.error(e));
};

  // Extract role from token claims
  const role = accounts[0]?.idTokenClaims?.roles?.[0] || null;
  const userName = accounts[0]?.name || "";

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f5f5f5" }}>

      {/* NAVBAR */}
      <div style={{ background: "#1D9E75", padding: "1rem 2rem",
                    display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "18px", margin: 0 }}>PSiddhi Custom App</h1>
        {isAuthenticated && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ color: "#fff", fontSize: "13px" }}>
              ✅ {userName} — <strong>{role}</strong>
            </span>
            <button onClick={handleLogout}
              style={{ padding: "6px 14px", borderRadius: "6px",
                       border: "none", cursor: "pointer", fontSize: "12px" }}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding: "2rem" }}>
        {!isAuthenticated ? (
          <div style={{ textAlign: "center", marginTop: "5rem" }}>
            <h2>Welcome to PSiddhi Custom App</h2>
            <p style={{ color: "#666", marginBottom: "2rem" }}>
              Sign in with your Microsoft account to view your dashboard
            </p>
            <button onClick={handleLogin}
              style={{ padding: "12px 32px", background: "#1D9E75", color: "#fff",
                       border: "none", borderRadius: "8px", fontSize: "15px", cursor: "pointer" }}>
              Login with Microsoft
            </button>
          </div>
        ) : (
          <Dashboard role={role} />
        )}
      </div>
    </div>
  );
}

export default App;