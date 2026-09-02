import { describe, it, expect } from "vitest";
import { APP_ROLES } from "../authConfig";

describe("APP_ROLES", () => {
  it("contains all 3 required roles", () => {
    expect(APP_ROLES.LEADER).toBe("Leader");
    expect(APP_ROLES.MANAGER).toBe("Manager");
    expect(APP_ROLES.PROJECT_LEAD).toBe("ProjectLead");
  });
});
