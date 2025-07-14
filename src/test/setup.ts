/// <reference types="vitest" />

import { afterEach } from "vitest";
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  // Clean up any global state or mocks after each test
  cleanup()
  // This can include resetting mocks, clearing caches, etc.
});