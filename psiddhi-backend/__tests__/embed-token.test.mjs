import { test, expect } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import appModule from '../server.js';

const app = appModule.default || appModule;
const SECRET = "49e0e32912514be7b07a93753bbc1f6469c11ac1381c3c88a5479f6b9f9d4f41";
const EXPECTED_IDS = { leader: 2, manager: 8, projectlead: 9 };

for (const [role, dashboardId] of Object.entries(EXPECTED_IDS)) {
  test(`/api/embed-token/${role} issues a token for dashboard ${dashboardId}`, async () => {
    const res = await request(app).post(`/api/embed-token/${role}`);
    expect(res.status).toBe(200);
    const token = res.body.iframeUrl.split('/embed/dashboard/')[1].split('#')[0];
    const decoded = jwt.verify(token, SECRET);
    expect(decoded.resource.dashboard).toBe(dashboardId);
  });
}
