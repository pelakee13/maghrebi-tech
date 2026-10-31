#!/usr/bin/env node
/**
 * Build-time guard: fail if any user-visible placeholder (TODO / [TODO...]) would
 * reach the production HTML of any page in either locale.
 * Runs after `next build`, scanning the prerendered HTML bodies.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), '.next', 'server', 'app');
const FORBIDDEN = /\[?TODO\b/i;

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (full.endsWith('.body') || full.endsWith('.html')) yield full;
  }
}

let bad = 0;
for (const file of walk(ROOT)) {
  const html = readFileSync(file, 'utf8');
  const match = html.match(FORBIDDEN);
  if (match) {
    const at = html.indexOf(match[0]);
    console.error(`TODO placeholder in production output: ${path.relative(process.cwd(), file)}\n  …${html.slice(Math.max(0, at - 60), at + 80).replace(/\n/g, ' ')}…`);
    bad++;
  }
}

if (bad) {
  console.error(`\n${bad} file(s) would show a TODO placeholder. Hide them in production (see lib/course-data.ts isSkippable/notesForRender).`);
  process.exit(1);
}
console.log('check-no-todo: clean — no TODO placeholders in production output.');
