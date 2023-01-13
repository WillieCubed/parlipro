import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders landing page", () => {
  render(<App />);
  const title = screen.getByText(/ParliPro/i);
  expect(title).toBeInTheDocument();
});
