import { render, screen } from '@testing-library/react';
import App from './App';

test('App test file', () => {
  render(
          <App />);
  const linkElement = screen.getByText(/this.jobs/i);
  expect(linkElement).toBeInTheDocument();
});
