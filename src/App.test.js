import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the quiz app header', () => {
  render(<App />);
  const heading = screen.getByText(/FER202/i);
  expect(heading).toBeInTheDocument();
});
