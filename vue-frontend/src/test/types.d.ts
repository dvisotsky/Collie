/// <reference types="vitest" />
/// <reference types="@testing-library/vue" />

declare module "@testing-library/vue" {
  import { Component } from "vue";
  import { RenderOptions } from "@testing-library/vue";

  export function render(
    component: Component,
    options?: RenderOptions & {
      global?: {
        plugins?: any[];
      };
    }
  ): {
    getByLabelText: (text: string) => HTMLElement;
    getByRole: (
      role: string,
      options?: { name: string | RegExp }
    ) => HTMLElement;
    getByTestId: (testId: string) => HTMLElement;
    findByText: (text: string | RegExp) => Promise<HTMLElement>;
  };

  export const fireEvent: {
    update: (element: HTMLElement, value: string) => Promise<void>;
    click: (element: HTMLElement) => Promise<void>;
  };
}
