import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Footer from "../components/Footer";

describe("Footer Component", () => {
  const renderFooter = () =>
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

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