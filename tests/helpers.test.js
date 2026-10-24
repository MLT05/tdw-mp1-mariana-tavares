import { describe, expect, it } from 'vitest';
import { sum } from './helpers.js';

describe('sum', () => {
  it('soma dois números positivos', () => {
    expect(sum(2, 2)).toBe(4);
  });

  it('soma um número negativo e um positivo', () => {
    expect(sum(-1, 1)).toBe(0);
  });
});