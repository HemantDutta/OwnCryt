import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorFallback } from "./ErrorFallback";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[app]", error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          onRetry={() => {
            this.setState({ hasError: false });
            window.location.assign("/");
          }}
        />
      );
    }
    return this.props.children;
  }
}
