import { render, screen } from "@testing-library/react";
import App from "./App";
import { createStore } from "redux";
import { renderHook } from "@testing-library/react-hooks/dom";
import { reducer } from "./store/reducer";
import { useDispatch } from "react-redux";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
