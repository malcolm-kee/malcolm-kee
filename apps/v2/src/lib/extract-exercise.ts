import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

import * as cache from 'cacache';
import MarkdownIt from 'markdown-it';
import { markdownItShikiTwoslashSetup } from 'markdown-it-shiki-twoslash';
import { init as initLexer, parse } from 'es-module-lexer';
import { Node, Project } from 'ts-morph';

const markdownParser = new MarkdownIt();

const shiki = await markdownItShikiTwoslashSetup({
  theme: 'nord', // for some reason when providing multiple themes it throws error
});

markdownParser.use(shiki);

const modules = import.meta.glob('../exercise/**/*.js', {
  query: 'raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

export type ExerciseData = {
  question: string;
  test: string;
  solution: string;
  extension: string;
  docs: string;
};

export function extractExercise(filter: {
  moduleName: string;
  group: string;
}): Promise<Map<string, ExerciseData>> {
  const applicableModules = new Map<string, () => Promise<string>>();

  for (const [modulePath, getModuleContent] of Object.entries(modules)) {
    const relativePath = path.relative(
      path.resolve('../exercise', filter.moduleName, filter.group),
      modulePath
    );
    if (!relativePath.startsWith('..')) {
      applicableModules.set(relativePath, getModuleContent);
    }
  }

  return groupModules(applicableModules);
}

async function groupModules(modules: Map<string, () => Promise<string>>) {
  const questionModule = new Map<string, [() => Promise<string>, string]>();
  const solutionModule = new Map<string, () => Promise<string>>();
  const testModule = new Map<string, () => Promise<string>>();

  modules.forEach((getModule, key) => {
    const solutionMatch = key.match(/(.+)\.solution\.([j|t]sx?)$/);

    if (solutionMatch) {
      solutionModule.set(`${solutionMatch[1]}.${solutionMatch[2]}`, getModule);
      return;
    }
    const testMatch = key.match(/(.+)\.(?:spec|test)\.([j|t]sx?)$/);

    if (testMatch) {
      testModule.set(`${testMatch[1]}.${testMatch[2]}`, getModule);
      return;
    }

    const questionMatch = key.match(/(.+)\.([j|t]sx?)$/);

    if (questionMatch) {
      questionModule.set(`${questionMatch[1]}.${questionMatch[2]}`, [getModule, questionMatch[2]]);
    }
  });

  const result = new Map<string, ExerciseData>();

  await initLexer;

  for (const [key, [getQuestion, extension]] of questionModule) {
    const getTest = testModule.get(key);
    const getSolution = solutionModule.get(key);

    if (getSolution && getTest) {
      let [question, test, solution] = await Promise.all([getQuestion(), getTest(), getSolution()]);

      const questionData = await parseQuestion(question, extension);

      result.set(key, {
        question: questionData.parsed,
        docs: questionData.docs && markdownParser.render(questionData.docs),
        test: rewriteTestImports(test),
        solution,
        extension,
      });
    }
  }

  return result;
}

const questionCacheDir = path.resolve('../..', '.cache');

async function parseQuestion(
  questionCode: string,
  extension: string
): Promise<{
  parsed: string;
  docs: string;
}> {
  const filePath = path.resolve(fileURLToPath(import.meta.url), '..', `problem.${extension}`);

  const hash = makeHash(questionCode, extension, filePath);

  try {
    const cached = await cache.get(questionCacheDir, hash);

    const cachedResult = JSON.parse(cached.data.toString('utf-8'));

    if (cachedResult && typeof cachedResult === 'object') {
      return cachedResult;
    }
  } catch (err) {
    // cache miss
  }

  let question = questionCode;

  let docs = '';

  const project = new Project({
    compilerOptions: {
      allowJs: true,
    },
  });

  const source = project.createSourceFile(filePath, question);

  const defaultExportedSymbol = source.getDefaultExportSymbol();

  if (defaultExportedSymbol) {
    const declarations = defaultExportedSymbol.getDeclarations();

    declarations.forEach((declaration) => {
      if (Node.isFunctionDeclaration(declaration)) {
        const jsDocs = declaration.getJsDocs();

        jsDocs.forEach((doc) => {
          const commentText = doc.getCommentText();

          if (commentText) {
            docs += `${commentText}\r\n`;
            question = question.substring(0, doc.getPos()) + question.substring(doc.getEnd());
          }
        });
      }
    });
  }

  const result = {
    parsed: question.trim(),
    docs,
  };

  cache.put(questionCacheDir, hash, JSON.stringify(result));

  return result;
}

const makeHash = (question: string, extension: string, path: string) =>
  createHash('md5').update(`${path}|${extension}|${question}`).digest('hex');

/**
 * Rewrite import of `<exercise>.solution.<ext>` to `index.<ext>`.
 */
function rewriteTestImports(testCode: string) {
  let test = testCode;

  const [imports] = parse(test);

  imports.forEach((importSpecifier) => {
    if (importSpecifier.n && importSpecifier.n.includes('.solution')) {
      test = `${test.slice(0, importSpecifier.s)}${'./index'}${test.slice(importSpecifier.e)}`;
    }
  });

  return test;
}
