import React from 'react';
import BoilOrNot from './BoilOrNot/';

class Calculator extends react.Component {
  constructor(props) {
    super(props);
    this.state = {tempValue: ''};
  }

  render() {
    return (
      <fieldset>
        <legend>온도를 섭씨(celcisus)로 입력하세요: </legend>
        <input
          value = {this.state.tempValue}
          onChange = {(e)=>this.setState({tempValue: e.target.valye})}
          />
      </fieldset>
    )
  }
}
