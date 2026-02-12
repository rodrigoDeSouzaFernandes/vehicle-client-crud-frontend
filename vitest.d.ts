import '@testing-library/jest-dom';

declare module 'vitest' {
  interface Assertion<T = any> {
    toBeInTheDocument(): void;
    toHaveFocus(): void;
    toHaveValue(value: string | number | string[]): void;
    toHaveTextContent(text: string | RegExp): void;
    toBeDisabled(): void;
    toBeEnabled(): void;
    toBeVisible(): void;
    toHaveClass(className: string): void;
    toHaveAttribute(attr: string, value?: string): void;
  }
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

interface CustomMatchers<R = void> {
  toBeInTheDocument(): R;
  toHaveValue(value: string | number | string[]): R;
  toHaveTextContent(text: string | RegExp): R;
  toHaveFocus(): R;
  toBeDisabled(): R;
  toBeEnabled(): R;
  toBeVisible(): R;
  toHaveClass(className: string): R;
  toHaveAttribute(attr: string, value?: string): R;
}
