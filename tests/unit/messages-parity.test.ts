import { describe, expect, it } from 'vitest';
import fa from '../../messages/fa.json';
import en from '../../messages/en.json';

// Flatten nested messages into dotted keys.
function keys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' ? keys(v as Record<string, unknown>, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

describe('messages parity', () => {
  it('fa and en have identical key sets', () => {
    const f = keys(fa).sort();
    const e = keys(en).sort();
    expect(f.filter((k) => !e.includes(k))).toEqual([]);
    expect(e.filter((k) => !f.includes(k))).toEqual([]);
  });

  it('has no empty strings', () => {
    const empty = (o: Record<string, unknown>): string[] =>
      Object.entries(o).flatMap(([k, v]) =>
        v && typeof v === 'object' ? empty(v as Record<string, unknown>).map((x) => `${k}.${x}`) : v === '' ? [k] : [],
      );
    expect(empty(fa)).toEqual([]);
    expect(empty(en)).toEqual([]);
  });
});
