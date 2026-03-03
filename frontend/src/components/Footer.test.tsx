import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "./Footer";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );

  type LinkProps = React.ComponentProps<"a"> & {
    to: string;
  };

  return {
    ...actual,
    Link: ({ to, children, ...props }: LinkProps) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

describe("Footer Component", () => {
  it("renders footer", () => {
    render(<Footer />);
    expect(screen.getByAltText("Brightest logo")).toBeInTheDocument();
  });

  it("displays navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});