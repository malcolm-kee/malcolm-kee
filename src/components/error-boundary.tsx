import * as React from 'react';
import { Button } from './Button';

export class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
  },
  { hasError: boolean }
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorStack: any) {
    console.error(error);
    console.error(errorStack);
  }

  render() {
    return this.state.hasError ? (
      <div className="max-w-sm mx-auto py-6 px-2 text-center">
        <h1 className="text-3xl text-red-500">Error</h1>
        <div className="py-4">
          <Button
            color="primary"
            onClick={() =>
              this.setState({
                hasError: false,
              })
            }
          >
            Retry
          </Button>
        </div>
      </div>
    ) : (
      <>{this.props.children}</>
    );
  }
}
