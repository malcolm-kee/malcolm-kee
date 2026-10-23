import { cssLanguage } from '@codemirror/lang-css';
import {
  codeFolding,
  foldEffect,
  foldedRanges,
  foldGutter,
  foldService,
  foldState,
} from '@codemirror/language';
import { EditorState, StateField, type Extension, type Text } from '@codemirror/state';
import { EditorView, type DecorationSet } from '@codemirror/view';

interface CssRegion {
  name: string;
  from: number;
  to: number;
}

function findRegions(doc: Text): Map<number, CssRegion> {
  const regions = new Map<number, CssRegion>();
  const openings: Array<Omit<CssRegion, 'to'>> = [];

  cssLanguage.parser.parse(doc.toString()).iterate({
    enter(node) {
      if (node.name !== 'Comment') return;

      const line = doc.lineAt(node.from);
      const comment = doc.sliceString(node.from, node.to);

      // Only standalone, single-line CSS comments are region markers.
      if (node.to > line.to || line.text.trim() !== comment) return;

      const marker = /^\/\*\s*#(region|endregion)(?:\s+(.*?))?\s*\*\/$/.exec(comment);
      if (!marker) return;

      if (marker[1] === 'region') {
        openings.push({ name: marker[2]?.trim() ?? '', from: line.to });
      } else {
        const opening = openings.pop();
        if (opening) {
          regions.set(opening.from, { ...opening, to: line.to });
        }
      }
    },
  });

  return regions;
}

const cssRegions = StateField.define({
  create: (state) => findRegions(state.doc),
  update: (regions, transaction) =>
    transaction.docChanged ? findRegions(transaction.newDoc) : regions,
});

/** Creates folding extensions with independent, remembered state for each CSS file. */
export function createCssFolding(defaultCollapsedRegions: readonly string[] = []) {
  const defaultNames = new Set(defaultCollapsedRegions);
  const savedFolds = new Map<string, { doc: Text; folds: DecorationSet }>();

  return (filePath: string): Extension[] => [
    cssRegions,
    foldService.of((state, _lineStart, lineEnd) => state.field(cssRegions).get(lineEnd) ?? null),
    foldGutter(),
    foldState.init((state) => {
      const saved = savedFolds.get(filePath);
      if (saved?.doc.eq(state.doc)) return saved.folds;

      const regions = [...state.field(cssRegions).values()]
        .filter((region) => defaultNames.has(region.name))
        .sort((a, b) => a.from - b.from);

      // Build the initial decorations through CodeMirror's folding API. Doing this
      // in the field initializer also works when Sandpack lazily creates a view.
      const initial = EditorState.create({ doc: state.doc, extensions: [codeFolding()] });
      return initial
        .update({ effects: regions.map((region) => foldEffect.of(region)) })
        .state.field(foldState);
    }),
    EditorView.updateListener.of(({ state }) => {
      savedFolds.set(filePath, { doc: state.doc, folds: foldedRanges(state) });
    }),
  ];
}
