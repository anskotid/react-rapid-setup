import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const ComponentToRender = hasError ? (
      <h3>An error occured!</h3>
    ) : (
      this.props.children
    );

    return ComponentToRender;
  }
}

export default ErrorBoundary;
