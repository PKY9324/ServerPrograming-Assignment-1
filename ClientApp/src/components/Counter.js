import React, { Component } from "react";
import { Display } from "./Display";
import { Square } from "./Square";

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);

    this.state = {
      squares: Array.from(Array(10).keys()),
      input: "",
      index: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderResult = this.renderResult.bind(this);
    this.numberSquare = this.numberSquare.bind(this);
    this.operatorSquare = this.operatorSquare.bind(this);
    this.operator = this.operator.bind(this);
    this.resultValue = this.resultValue.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleClick(i) {
    this.setState({
      input: this.state.input + i,
    });
  }

  renderResult() {
    return <Display value={this.state.input} />;
  }

  numberSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  operatorSquare(label) {
    return <Square value={label} onClick={() => this.operator(label)} />;
  }

  operator(label) {
    this.setState({
      input: this.state.input + label,
    });
  }

  async resultValue() {
    this.setState({ input: eval(this.state.input) });
    await fetch("api/calculate", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.index + 1,
        result: this.state.input,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  clear() {
    this.setState({
      input: "",
    });
  }

  render() {
    return (
      <div>
        <h2>201635965 컴퓨터공학과 박경열</h2>
        {this.renderResult()}
        <div className="board-row">
          {this.numberSquare(7)}
          {this.numberSquare(8)}
          {this.numberSquare(9)}
          {this.operatorSquare("/")}
        </div>
        <div className="board-row">
          {this.numberSquare(4)}
          {this.numberSquare(5)}
          {this.numberSquare(6)}
          {this.operatorSquare("*")}
        </div>
        <div className="board-row">
          {this.numberSquare(1)}
          {this.numberSquare(2)}
          {this.numberSquare(3)}
          {this.operatorSquare("-")}
        </div>
        <div className="board-row">
          {this.numberSquare(0)}
          <Square value={"C"} onClick={() => this.clear()} />
          <Square value={"="} onClick={() => this.resultValue()} />
          {this.operatorSquare("+")}
        </div>
      </div>
    );
  }

  async getData() {
    const response = await fetch("api/calculate");
    const data = await response.json();
    this.setState({
      input: data[0].result.toString(),
      index: data[0].id,
    });
  }
}
