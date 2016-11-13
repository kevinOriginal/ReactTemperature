import React from 'react';
import BoilOrNot from './BoilOrNot';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {

    return (
      <fieldset>
        <legend>온도를 섭씨(celsius)로 입력하세요: </legend>
        <input
          value = {this.state.value}
          onChange = {(e)=>this.setState({value: e.target.value})}
          />
          <BoilOrNot
            celsius = {parseFloat(this.state.value)} />
      </fieldset>
    )
  }
}

export default Calculator;
