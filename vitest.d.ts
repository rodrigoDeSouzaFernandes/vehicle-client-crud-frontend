import '@testing-library/jest-dom'

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

interface CustomMatchers<R = void> {
  toBeInTheDocument(): R
  toHaveValue(value: string | number | string[]): R
  toHaveTextContent(text: string | RegExp): R
  toHaveFocus(): R
  toBeDisabled(): R
  toBeEnabled(): R
  toBeVisible(): R
  toHaveClass(className: string): R
  toHaveAttribute(attr: string, value?: string): R
}
