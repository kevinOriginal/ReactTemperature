import React from 'react';
import TemperatureInput from './TemperatureInput'
import BoilOrNot from './BoilOrNot'

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', scale: 'c'};
  }

  toCelsius(f) {
    return (f - 32) * 5 / 9 ;
  }

  toFahrenheit(c) {
    return (c * 9 / 5) + 32 ;
  }

  Converter(value, convert) {
    const input = parseFloat(value);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output*1000) / 1000;
    return rounded.toString();
  }

  render() {
    const value = this.state.value; // 코드가 너무 더러워져서 어쩔수 없이 상수에다가 calculator 의 state 중 value의 값을 넣음

    const celsius = this.state.scale === 'f' ? this.Converter(value, this.toCelsius) : value;

    const fahrenheit = this.state.scale === 'c' ? this.Converter(value, this.toFahrenheit) : value;
    // 각 변수에 state의 scale 에 따라서 변환할 필요가 잇으면 Converter 함수를 써서 변환해라

    return (
      <div>
      <p>GDG 온도 변환기!</p>
        <TemperatureInput
          scale="c"
          value={celsius}
          onChange={(e) => {
            this.setState({value: e, scale: 'c'})
            }
          }
        />
        <TemperatureInput
          scale="f"
          value={fahrenheit}
          onChange={(e) => {
            this.setState({value: e, scale: 'f'})
            }
          }
        />
        <BoilOrNot
          celsius = {parseFloat(celsius)}
        />

      </div>
    )
  }
}

export default Calculator;
