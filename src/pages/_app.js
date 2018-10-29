import App, { Container } from "next/app";
import React from "react";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { store as makeStore } from "../redux/store/store";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
