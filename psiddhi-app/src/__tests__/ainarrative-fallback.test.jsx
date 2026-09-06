import { render, screen, waitFor } from '@testing-library/react';
import { vi, test, expect } from 'vitest';
import axios from 'axios';
import AINarrative from '../AINarrative';

vi.mock('axios');

test('shows role-specific fallback narrative when live AI call fails', async () => {
  axios.post.mockRejectedValueOnce(new Error('network error'));
  render(<AINarrative role="Manager" reportName="Manager Dashboard" />);
  await waitFor(() => {
    expect(screen.getByText(/scoped to your region only/i)).toBeInTheDocument();
  });
});
