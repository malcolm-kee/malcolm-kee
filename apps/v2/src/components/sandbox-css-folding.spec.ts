import { css } from '@codemirror/lang-css';
import { foldable, foldedRanges, unfoldEffect } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { describe, expect, test } from 'vitest';
import { createCssFolding } from './sandbox-css-folding';

function createState(code: string, defaultCollapsedRegions: readonly string[] = []) {
  return EditorState.create({
    doc: code,
    extensions: [css(), ...createCssFolding(defaultCollapsedRegions)('/styles.css')],
  });
}

function foldAt(state: EditorState, lineNumber: number) {
  const line = state.doc.line(lineNumber);
  return foldable(state, line.from, line.to);
}

function getFolds(state: EditorState) {
  const ranges: Array<{ from: number; to: number }> = [];
  foldedRanges(state).between(0, state.doc.length, (from, to) => {
    ranges.push({ from, to });
  });
  return ranges;
}

describe('CSS region folding', () => {
  test('folds multiple CSS rules as one region while leaving its name visible', () => {
    const state = createState(`/* #region Setup */
body { margin: 0; }
button { cursor: pointer; }
/* #endregion */
.card { color: white; }`);

    expect(foldAt(state, 1)).toEqual({
      name: 'Setup',
      from: state.doc.line(1).to,
      to: state.doc.line(4).to,
    });
    expect(getFolds(state)).toEqual([]);
  });

  test('initially collapses only exact matches for the configured names', () => {
    const state = createState(
      `/* #region Setup */
body { margin: 0; }
/* #endregion */
/* #region Setup example */
button { cursor: pointer; }
/* #endregion */
/* #region Animation */
.card { animation: fade 1s; }
/* #endregion */`,
      ['Setup', 'Animation']
    );

    expect(getFolds(state)).toEqual([
      { from: state.doc.line(1).to, to: state.doc.line(3).to },
      { from: state.doc.line(7).to, to: state.doc.line(9).to },
    ]);
    expect(foldAt(state, 4)).not.toBeNull();
  });

  test('pairs nested regions with their own closing markers', () => {
    const state = createState(`/* #region Outer */
body { margin: 0; }
  /* #region Inner */
button { cursor: pointer; }
  /* #endregion */
.card { color: white; }
/* #endregion */`);

    expect(foldAt(state, 1)?.to).toBe(state.doc.line(7).to);
    expect(foldAt(state, 3)).toMatchObject({ name: 'Inner', to: state.doc.line(5).to });
  });

  test('can initially collapse both an outer region and a nested named region', () => {
    const state = createState(
      `/* #region Outer */
/* #region Inner */
body { margin: 0; }
/* #endregion */
/* #endregion */`,
      ['Outer', 'Inner']
    );

    expect(getFolds(state)).toEqual([
      { from: state.doc.line(1).to, to: state.doc.line(5).to },
      { from: state.doc.line(2).to, to: state.doc.line(4).to },
    ]);
  });

  test('ignores unmatched markers and marker-like text in strings or multiline comments', () => {
    const state = createState(
      `/* #endregion */
.card::before { content: "/* #region Setup */"; }
/* #endregion */
/*
  #region Setup
*/
/* #region Unclosed */
body { margin: 0; }`,
      ['Setup', 'Unclosed']
    );

    expect(foldAt(state, 1)).toBeNull();
    expect(foldAt(state, 3)).toBeNull();
    expect(foldAt(state, 4)).toBeNull();
    expect(foldAt(state, 7)).toBeNull();
    expect(getFolds(state)).toEqual([]);
  });

  test('supports CRLF input, whitespace, and names containing spaces', () => {
    const state = createState(
      ['  /* #region Page Setup   */', 'body { margin: 0; }', '  /* #endregion Page Setup */'].join(
        '\r\n'
      ),
      ['Page Setup']
    );

    expect(getFolds(state)).toEqual([{ from: state.doc.line(1).to, to: state.doc.line(3).to }]);
  });

  test('keeps normal CSS block folding available outside named regions', () => {
    const state = createState(`.card {
  color: white;
  background: purple;
}`);

    expect(foldAt(state, 1)).toEqual({
      from: state.doc.line(1).to,
      to: state.doc.line(4).from,
    });
  });

  test('updates fold targets after edits without re-collapsing a region the reader opened', () => {
    let state = createState(
      `/* #region Setup */
body { margin: 0; }
/* #endregion */`,
      ['Setup']
    );
    state = state.update({ effects: unfoldEffect.of(getFolds(state)[0]) }).state;
    state = state.update({ changes: { from: 0, insert: '\n' } }).state;

    expect(getFolds(state)).toEqual([]);
    expect(foldAt(state, 2)).toMatchObject({
      name: 'Setup',
      from: state.doc.line(2).to,
      to: state.doc.line(4).to,
    });
  });
});
