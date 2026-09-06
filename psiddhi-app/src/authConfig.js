// Microsoft Entra ID Configuration
export const msalConfig = {
  auth: {
    clientId: "7f62d98e-2b40-4aa2-b2d1-62edaadabc63",
    authority: "https://login.microsoftonline.com/48fa82a9-7a6f-4d71-a057-9c2d2b1c5ac0",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};
export const loginRequest = {
  scopes: ["openid", "profile", "email"]
};
// Role definitions matching your Entra ID App Roles
export const APP_ROLES = {
  LEADER: "Leader",
  MANAGER: "Manager",
  PROJECT_LEAD: "ProjectLead"
};
