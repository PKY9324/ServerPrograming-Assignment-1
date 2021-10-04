import React, { Component } from "react";
import { Counter } from "./components/Counter";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <>
        <Counter />
      </>
    );
  }
}
