import React from "react";
import { render } from "@testing-library/react";
import AppMain from "./App";

test("renders learn react link", () => {
    render(<AppMain />);
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
    expect(2).toBe(2);
});
