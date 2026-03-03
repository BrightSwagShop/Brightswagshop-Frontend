import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Footer from "./Footer";

const renderFooter = () => {
  const router = createMemoryRouter([{ path: "/", element: <Footer /> }], {
    initialEntries: ["/"],
  });
  return render(<RouterProvider router={router} />);
};

describe("Footer Component", () => {
  it("renders footer", () => {
    renderFooter();
    expect(screen.getByAltText("Brightest logo")).toBeInTheDocument();
  });

  it("displays navigation links", () => {
    renderFooter();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});