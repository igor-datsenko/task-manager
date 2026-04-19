import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the task board', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Board' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /\+ new task/i })).toBeInTheDocument();
});
