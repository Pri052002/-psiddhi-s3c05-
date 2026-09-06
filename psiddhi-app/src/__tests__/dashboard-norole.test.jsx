import { render, screen } from '@testing-library/react';
import { vi, test, expect } from 'vitest';
import Dashboard from '../Dashboard';

vi.mock('../AINarrative', () => ({ default: () => <div>AI Narrative Mock</div> }));

test('shows warning when no role is assigned', () => {
  render(<Dashboard role={undefined} />);
  expect(screen.getByText(/No role assigned/i)).toBeInTheDocument();
});
