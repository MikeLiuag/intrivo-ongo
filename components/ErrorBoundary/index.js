import React, { Component } from 'react';
import { Platform } from 'react-native';
import * as Sentry from 'sentry-expo';
import Fallback from './Fallback';
import { currentVersion, currentBuild } from '../../utilis/constants';

/* Initialize Sentry settings */
Sentry.init({
  environment: process.env.APP_ENV || 'dev',
  release: currentVersion && currentBuild ? `${currentVersion}-${currentBuild}` : '1.0-100',
  dsn: 'https://11504b2cf60041c6bed95d7668251919@o1167702.ingest.sentry.io/6704333',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorInfo: '',
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const SentryPlatform = Platform.OS === 'web' ? Sentry.Browser : Sentry.Native;
    SentryPlatform.withScope((scope) => {
      scope.setExtras(errorInfo);
      SentryPlatform.captureException(error);
      this.setState({
        errorInfo,
      });
    });
  }

  render() {
    const { children } = this.props;
    const { hasError, errorInfo } = this.state;

    if (hasError) {
      return <Fallback errorInfo={errorInfo} />;
    }
    return children;
  }
}
