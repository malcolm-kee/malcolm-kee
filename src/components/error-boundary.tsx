import * as React from 'react';

export class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: any, errorStack: any) {
    this.setState(
      {
        hasError: true,
      },
      () => {
        console.error(error);
        console.error(errorStack);
      }
    );
  }

  render() {
    return this.state.hasError ? (
      <h1>Error happend!</h1>
    ) : (
      <>{this.props.children}</>
    );
  }
}
