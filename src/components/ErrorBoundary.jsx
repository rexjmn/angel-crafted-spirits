import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Actualiza el estado para renderizar el fallback UI en el próximo renderizado
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // En producción, puede enviarse a un servicio de monitoreo en lugar de solo usar `console.error`
    if (process.env.NODE_ENV === 'development') {
      console.error("Error caught in ErrorBoundary:", error, info);
    }
  }

  handleRetry = () => {
    // Restablece el estado de error para intentar renderizar los hijos nuevamente
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Oops! Something went wrong.</h1>
          <p>There was an unexpected error. Please try again.</p>
          <button onClick={this.handleRetry} className="retry-button">
            Try Again
          </button>
          <button onClick={() => window.location.reload()} className="reload-button">
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
