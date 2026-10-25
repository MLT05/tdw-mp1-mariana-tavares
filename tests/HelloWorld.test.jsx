import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import HelloWorld from "./HelloWorld";

test("apresenta o título Olá, mundo!", () => {
  render(<HelloWorld />);

  expect(
    screen.getByRole("heading", { level: 1, name: "Olá, mundo!" }),
  ).toBeDefined();
});
