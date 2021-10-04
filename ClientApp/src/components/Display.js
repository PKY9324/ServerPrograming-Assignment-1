import React, { Component } from "react";

export class Display extends React.Component {
  render() {
    return <input type="text" value={this.props.value} />;
  }
}
