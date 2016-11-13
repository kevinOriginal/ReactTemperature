import React from 'react';
import BoilOrNot from './BoilOrNot';


class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }



  render() {
    const scale = this.props.scale; //Calculator에서 prop으로 받아온 scale 을 변수 scale 에 입력시킴.
    const value = this.props.value;

    const scaleNames = {
      c : 'Celsius',
      f : 'Fahrenheit'
    }

    return (
      <fieldset>
        <legend>온도를 {scaleNames[scale]}로 입력하세요: </legend>
        <input
          value = {this.props.value}
          onChange = {(e)=>{
            this.props.onChange(e.target.value);
            this.setState({value: value})
          }}
        />
      </fieldset>
    );
  }
}

export default TemperatureInput;
