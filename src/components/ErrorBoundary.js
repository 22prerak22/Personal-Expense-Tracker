// src/components/ErrorBoundary.js
import React, { useState } from "react";
import Modal from "./UI/Modal"; // Create a Modal component
// import "./ErrorBoundary.css"; // Add styles for your modal

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message }; // Store the error message
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleCloseModal = () => {
    this.setState({ hasError: false, errorMessage: "" }); // Reset state
  };

  render() {
    if (this.state.hasError) {
      return (
        <Modal onClose={this.handleCloseModal}>
          <h2>Something went wrong.</h2>
          <p>{this.state.errorMessage}</p>
          <button onClick={this.handleCloseModal}>Close</button>
        </Modal>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
