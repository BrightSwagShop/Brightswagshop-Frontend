import { describe, it, expect } from 'vitest';
import { bugLabels } from '../../BugFlags';

describe('BugFlags', () => {
  it('contains bug labels', () => {
    expect(bugLabels).toBeDefined();
    expect(bugLabels.BROKEN_CATEGORY_SLUG).toBe('Route slug mismatch (category lookup faalt)');
  });

  it('has all expected bug keys', () => {
    const expectedKeys = [
      'BROKEN_CATEGORY_SLUG',
      'EMPTY_CATEGORY_ITEMS',
      'BROKEN_IMAGES',
      'RANDOM_API_ERROR',
      'SLOW_LOADING'
    ];
    
    expectedKeys.forEach(key => {
      expect(bugLabels[key as keyof typeof bugLabels]).toBeDefined();
    });
  });
});
