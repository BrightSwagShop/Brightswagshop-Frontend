import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadBugFlags, saveBugFlags, isBugOn, setBugOn } from '../../BugStore';

describe('BugStore', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    });
  });

  it('exports utility functions', () => {
    expect(loadBugFlags).toBeDefined();
    expect(saveBugFlags).toBeDefined();
    expect(isBugOn).toBeDefined();
    expect(setBugOn).toBeDefined();
  });

  it('loadBugFlags returns default flags when no storage', () => {
    const flags = loadBugFlags();
    expect(flags).toBeDefined();
    expect(flags.BROKEN_CATEGORY_SLUG).toBe(false);
  });
});
