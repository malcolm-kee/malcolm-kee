import { CompilerErrorDetail, CompilerDiagnostic } from 'babel-plugin-react-compiler';
import { useDeferredValue, useMemo, useState, type JSX } from 'react';
import { useStore } from '../StoreContext';
import { ConfigEditor } from './ConfigEditor';
import { Input } from './Input';
import { CompilerOutput, default as Output } from './Output';
import { compile } from '../../lib/compilation';
import { format as prettyFormat } from 'pretty-format';

export default function Editor(): JSX.Element {
  const store = useStore();
  const deferredStore = useDeferredValue(store);
  const [compilerOutput, appliedOptions] = useMemo(
    () => compile(deferredStore.source, 'compiler', deferredStore.config),
    [deferredStore.source, deferredStore.config]
  );
  const [linterOutput] = useMemo(
    () => compile(deferredStore.source, 'linter', deferredStore.config),
    [deferredStore.source, deferredStore.config]
  );
  const [formattedAppliedConfig, setFormattedAppliedConfig] = useState('');

  let mergedOutput: CompilerOutput;
  let errors: Array<CompilerErrorDetail | CompilerDiagnostic>;
  if (compilerOutput.kind === 'ok') {
    errors = linterOutput.kind === 'ok' ? [] : linterOutput.error.details;
    mergedOutput = {
      ...compilerOutput,
      errors,
    };
  } else {
    mergedOutput = compilerOutput;
    errors = compilerOutput.error.details;
  }

  if (appliedOptions) {
    const formatted = prettyFormat(appliedOptions, {
      printFunctionName: false,
      printBasicPrototype: false,
    });
    if (formatted !== formattedAppliedConfig) {
      setFormattedAppliedConfig(formatted);
    }
  }

  return (
    <>
      <div className="relative flex top-[var(--rcp-header-height)]">
        <div className="flex-shrink-0">
          <ConfigEditor formattedAppliedConfig={formattedAppliedConfig} />
        </div>
        <div className="flex flex-1 min-w-0">
          <Input errors={errors} />
          <Output store={deferredStore} compilerOutput={mergedOutput} />
        </div>
      </div>
    </>
  );
}
