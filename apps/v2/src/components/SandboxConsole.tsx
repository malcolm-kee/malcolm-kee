import { useSandpackConsole } from '@codesandbox/sandpack-react';
import { clsx } from 'clsx';
import * as React from 'react';
import { isNotNil } from '~/lib/type-guard';
import { MiniNoSymbolIcon, MiniTerminalIcon } from './icons';

export const SandBoxConsole = () => {
  const { logs, reset } = useSandpackConsole();

  if (logs.length === 0) {
    return null;
  }

  return (
    <div className="not-prose">
      <div className="flex justify-between items-center px-3 py-1">
        <div className="inline-flex items-center gap-2">
          <MiniTerminalIcon className="w-5 h-5 text-gray-400" />
          <span className="text-xs">Console</span>
        </div>

        <button
          onClick={() => reset()}
          type="button"
          className="text-gray-500 hover:text-gray-700"
          aria-label="Clear"
          title="Clear"
        >
          <MiniNoSymbolIcon />
        </button>
      </div>
      <ul className="flex flex-col bg-zinc-800 text-white">
        {logs.map((log) => (
          <SandboxConsoleLogItem log={log} key={log.id} />
        ))}
      </ul>
    </div>
  );
};

type SandpackConsoleLog = ReturnType<typeof useSandpackConsole>['logs'][number];

const SandboxConsoleLogItem = React.memo(function SandboxConsoleLogItem({
  log,
}: {
  log: SandpackConsoleLog;
}) {
  const items = log.data ? log.data.map(formatLog) : [];

  return (
    <li
      className={clsx(
        'flex items-start gap-3 px-3 py-1.5 border-b border-b-zinc-700 last:border-b-0 border-l-4',
        logLeftBorder[log.method] || 'border-l-transparent'
      )}
    >
      <span className={clsx('block w-16 font-mono', logColor[log.method])}>
        [{log.method}]
      </span>
      {items.map((item, index) => (
        <LogNode item={item} key={index} />
      ))}
    </li>
  );
});

const LogNode = ({ item }: { item: LogNodeData }) => {
  if (item.type === 'number' || item.type === 'boolean') {
    return <span className="font-mono text-indigo-300">{item.value}</span>;
  }

  if (item.type === 'string') {
    return <span className="font-mono text-teal-300">{item.value}</span>;
  }

  if (item.type === 'null' || item.type === 'undefined') {
    return <span className="font-mono text-red-300">{item.value}</span>;
  }

  if (item.type === 'array') {
    return (
      <div className="flex items-start gap-1">
        <span className="italic">({item.items.length})</span>
        <div className="flex items-center gap-1">
          <span className="font-mono">[</span>
          {item.items.map((childItem, index) => (
            <React.Fragment key={index}>
              <LogNode item={childItem} />
              {index < item.items.length - 1 && ','}
            </React.Fragment>
          ))}
          <span className="font-mono">]</span>
        </div>
      </div>
    );
  }

  if (item.type === 'object') {
    return (
      <div>
        <div className="font-mono">{'{'}</div>
        <div className="pl-4">
          {item.fields.map((field) => (
            <div className="flex items-start gap-0.5" key={field.prop}>
              <span className="font-mono">{field.prop}:</span>{' '}
              <LogNode item={field.value} />
            </div>
          ))}
        </div>
        <div className="font-mono">{'}'}</div>
      </div>
    );
  }

  if (item.type === 'map') {
    return (
      <div className="flex items-start gap-1">
        <span className="italic">Map({item.items.length})</span>
        <div className="flex items-center gap-1">
          <span className="font-mono">{'{'}</span>
          {item.items.map((childItem, index) => (
            <React.Fragment key={index}>
              <LogNode item={childItem.key} />
              <span>{'=>'}</span>
              <LogNode item={childItem.value} />
              {index < item.items.length - 1 && ','}
            </React.Fragment>
          ))}
          <span className="font-mono">{'}'}</span>
        </div>
      </div>
    );
  }

  if (item.type === 'set') {
    return (
      <div className="flex items-start gap-1">
        <span className="italic">Set({item.items.length})</span>
        <div className="flex items-center gap-1">
          <span className="font-mono">{'{'}</span>
          {item.items.map((childItem, index) => (
            <React.Fragment key={index}>
              <LogNode item={childItem} />
              {index < item.items.length - 1 && ','}
            </React.Fragment>
          ))}
          <span className="font-mono">{'}'}</span>
        </div>
      </div>
    );
  }

  if (item.type === 'unknown') {
    return <span className="font-mono">(unknown)</span>;
  }

  return null;
};

const logLeftBorder: {
  [key in SandpackConsoleLog['method']]?: string;
} = {
  info: 'border-l-sky-400',
  warn: 'border-l-amber-400',
  error: 'border-l-rose-400',
};

const logColor: {
  [key in SandpackConsoleLog['method']]?: string;
} = {
  info: 'text-sky-200',
  warn: 'text-amber-200',
  error: 'text-rose-200',
};

type ConsoleData =
  | string
  | Record<string, string>
  | Array<string | Record<string, string>>
  | undefined;

type LogNodeData =
  | {
      type: 'string' | 'boolean' | 'number' | 'undefined' | 'null';
      value: string;
    }
  | {
      type: 'array';
      items: Array<LogNodeData>;
    }
  | {
      type: 'map';
      items: Array<{
        key: LogNodeData;
        value: LogNodeData;
      }>;
    }
  | {
      type: 'set';
      items: Array<LogNodeData>;
    }
  | {
      type: 'object';
      fields: Array<{
        prop: string;
        value: LogNodeData;
      }>;
    }
  | {
      type: 'unknown';
    };

function formatLog(data: ConsoleData): LogNodeData {
  switch (typeof data) {
    case 'string':
      return {
        type: 'string',
        value: `'${data}'`,
      };

    case 'number':
      return {
        type: 'number',
        value: `${data}`,
      };

    case 'boolean':
      return {
        type: 'boolean',
        value: String(data),
      };

    case 'undefined':
      return {
        type: 'undefined',
        value: 'undefined',
      };

    case 'object': {
      if (data == null) {
        return {
          type: 'null',
          value: 'null',
        };
      }

      if (Array.isArray(data)) {
        return {
          type: 'array',
          items: data.map((d) => formatLog(d)).filter(isNotNil),
        };
      }

      if ('@t' in data) {
        if (data['@t'] === '[[undefined]]') {
          return {
            type: 'undefined',
            value: 'undefined',
          };
        }

        if (
          data['@t'] === '[[Map]]' &&
          'data' in data &&
          Array.isArray(data.data)
        ) {
          const items: Array<{
            key: LogNodeData;
            value: LogNodeData;
          }> = [];

          let key: LogNodeData | undefined;

          data.data.forEach((item) => {
            if (key) {
              items.push({
                key,
                value: formatLog(item),
              });
              key = undefined;
            } else {
              key = formatLog(item);
            }
          });

          return {
            type: 'map',
            items,
          };
        }

        if (
          data['@t'] === '[[Set]]' &&
          'data' in data &&
          Array.isArray(data.data)
        ) {
          return {
            type: 'set',
            items: data.data.map(formatLog),
          };
        }
      }

      return {
        type: 'object',
        fields: Object.entries(data).map(([prop, value]) => ({
          prop,
          value: formatLog(value),
        })),
      };
    }

    default:
      return {
        type: 'unknown',
      };
  }
}
