import { render, screen, waitFor } from '@testing-library/react';
import { vi, test, expect } from 'vitest';
import axios from 'axios';
import Dashboard from '../Dashboard';

vi.mock('axios');
vi.mock('../AINarrative', () => ({ default: () => <div>AI Narrative Mock</div> }));

test('renders Leader heading and loads signed embed iframe', async () => {
  axios.post.mockResolvedValueOnce({
    data: { iframeUrl: 'https://example.com/embed/dashboard/testtoken' }
  });
  render(<Dashboard role="Leader" />);
  expect(screen.getByText(/Leader Dashboard/i)).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getByTitle('Leader Report')).toBeInTheDocument()
  );
});
