import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    let readable = error.message;
    try {
      const parsed = JSON.parse(error.message) as { error?: string; operationType?: string; path?: string };
      if (parsed.error) {
        readable = `Database operation (${parsed.operationType || 'request'} on ${parsed.path || 'resource'}): ${parsed.error}`;
      }
    } catch {
      // Plain error message
    }
    return { hasError: true, errorMessage: readable };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
          <div className="max-w-lg w-full border border-neutral-200 p-8">
            <p className="text-xs font-medium tracking-wider text-[#780033] mb-2">
              System Notice
            </p>
            <h1 className="text-2xl font-bold text-[#171717] mb-3">
              Something interrupted this view
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              {this.state.errorMessage || 'An unexpected error occurred while loading this page.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 text-sm font-medium bg-[#780033] text-white hover:bg-[#5B0027] transition-colors"
              >
                Reload Page
              </button>
              <a
                href="/"
                className="px-5 py-2.5 text-sm font-medium border border-neutral-300 text-[#171717] hover:border-[#171717] transition-colors"
              >
                Return Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
