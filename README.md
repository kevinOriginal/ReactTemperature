# Temperature Calcuator

## Pre Javascipt!
다음은 이번 만드는 과정에서 쓰이는 메써드 들이다. 참고하자.
* `parseFloat(value)` : parses a string and returns a floating point number.  즉 입력값을 파씽하여 숫자로 벼환.
* `value.toString` : converts a number to a string. 숫자를 string으로!


## 우리가 만들것?
* React 만으로 입력받은 온도를 화씨<=> 섭씨 변환하며 물이 끓는 온도인지 아닌지를 판단하는 간단한 계산기 만든다.
* 화씨와 섭씨 입력 칸이 있고 한곳에 입력하면 다른 곳에 자동으로 변환된 값이 나오며 어떤 값을 입력해도 밑에 물이 끓는 온도인지 아닌지 나타내준다.

## 목적
* React 의 기본적인 component 구성방식, props, state flow와 callback 연습을 한다.

## How to make?

* 본인의 실력에 따라서 다음과 같이 나누면 좋을 것이다.
  - 고수 : 아예 component 설계부터 본인이 짠다.
  - 중수 : Project Hierarchy 와 이 문서 밑에 설명되어 있는 설계 진행 단계들을 보면서 코드를 짜고 리팩토링한다.
  - 늅늅 : git checkout을 해가면서 답안의 코드를 조금씩 보며 과제를 한다.

총 3단계로 나누어져 있으며 step01 step02 step03 이 있다.
`git checkout step01` 과 같이 완성된 코드를 봐가면서 코드를 짜면 된다.
하지만 본인이 짠 코드랑 크게 다를 수 있으므로 오히려 안보고 짜는 것이 쉬울 수도 있겠다.

## 완성형의 Hierarchy 는 다음과 같다. (꼭 이래야된다는 것은 아님)
- components
  - BoilOrNot.js
  - Calculator.js
  - TemperatureInput.js
- App.js

`Calculator` 안에 `< TemperatureInput />` 컴포넌트가 화씨 섭씨용 두개 들어가며, 그 밑에는 끓는지 아닌지를 나타내주기 위한 `<BoilOrNot />`컴포넌트가 하나 들어간다.


## 만드는 과정은 다음과 같다.(중요)
사실 리팩토링을 많이 해야 되는 과정이므로 한번에 만들고 싶은 사람은 쭉 읽어본다음에 3단계로 쭉 들어가버리는것도 나쁘지 않다.


1. **BoilOrNot 과 Calculator Component 를 먼저 만든다.**

 섭씨(celcisus)온도 하나만을 입력받고 이가 끓는지 안끓는지 나타내주는 앱을 먼저 만들어 보자.

 > `<BoilOrNot />` 는 섭씨(celcisus)의 입력값에 따라서 물이 끓는지 안끓는지 나타내주는 컴포넌트이다. 따로 저장할 state 가 있는가? 당연히 없다. 그러므로
**functional component** 로 만들어주면 되겠다.

 > `<Calculator />` 는 온도를 입력하게 해주며, 이 온도를 자신의 state에 저장을 한다. 또한 `<BoilOrNot />`을 render 해주기도 하며 즉 그렇기 때문에 **class component** 가 되어야 겠다.


2. **섭씨 뿐만 아니라 화씨(fahrenheit)또한 입력받게 한다.**
 입력받기 위해서는 온도를 입력받는 `< TemperatureInput />` 이라는 component를 따로 만드는 편이 속시원할 것이다.

 > `< TemperatureInput />`은 화씨인지 섭씨인지 알기 위해서 이를 위한 구분자를 render()에 새로운 object로 넣어주면 될듯 하다. 다음과 같이 말이다.
 ```
  const scaleNames = {
    c : 'Celsius',
    f : 'Fahrenheit'
  }
 ```

 > `< TemperatureInput />`은 input을 입력받아 자신의 state에 저장을 해야 하므로 **class component** 가 되어야 할 것이다.
 이제 `<Calculator />` 안에있던 input 부분과 value를 저장했던 state 대신에 `< TemperatureInput />` 을 두개 넣어주는 리팩토링을 해보자. 각각의 property는 "c" 와 "f"로 해주면 되겠다.

 >여기까지 하면 View 에는 온도를 입력하는 창이 두개가 있고 각각 섭씨와 화씨 온도를 입력받으라고 하며 100도가 넘으면 물이 끓는다고 나온다. 하지만 문제점이 있다. 우리가 만들고싶은 것은 사실 두 온도를 입력했을때 서로 변환까지 해주면서 물이 끓는지 안끓는지를 나타내줘야한다. 즉 **두 값을 연결** 해줘야 하며, C/F 변환 함수를 또한 만들어 줄 필요가 있다.


3. **완성 단계 1**
 - 여기서 부터 살짝 복잡해진다. 2단계 까지는 `< TemperatureInput />` 의 state 에만 모든 것을 저장했다면, 그 state를 갖다가 `<Calculator />`의 state에 저장을 해줘야 하며, `<Calculator />` 은 우리가 입력한 것이 C/F 둘중 어느것인지 구별을 해야 한다. 또한 구별된 것을 바탕으로 변환하는 함수를 적절히 활용해서 나머지 한쪽 Input을 바꾸어야 한다.

 - 따라서 다음과 같은 Callback 과정을 거친다고 생각하면 된다.
`< TemperatureInput />` 의 **state** => `<Calculator />`의 state => C/F 변환 => `< TemperatureInput />` 의 prop으로 넘겨줘서 input에 다시 입력.

 - 맨 먼저 `Calculator`의 state을 다음과 같이 만들어 준다.
 ```
 class Calculator extends React.Component {
   constructor(props) {
     super(props);
     this.state = {value: '', scale 'c'};
   }
```

 - 그다음은 `Calculator` class 안에 변환함수를 생성해주는 게 일이다.
React class 내부에 함수를 짤 때는 function을 안붙여줘도 된다는 사실을 잊지 말자.
  ```
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
  ```
 - 이제 각각의 `< TemperatureInput />`의 input 변화(onChange)에 따라서 `Calculator`의 state 를 변화시켜주자. 그러기 위해서는 `< TemperatureInput />`의 각 props 를 조금씩 변형시켜줘야 한다. 먼저 onChange 에 대해서, 만약 사용자가 어떤 값을 입력하려고 시도하는 순간 우리는 현재 `Calculator`의 state 에 변화를 줄 필요가 있다. 그 변화는 첫번째 값(value)을 현재 유저가 타이핑치고 있는 값으로 변환, 두번째, scale을 어떤 값을 치고 있는지 알려줘야 한다. 이런식으로 state를 저장해야 적절히 C/F 변환을 하여 다른 `< TemperatureInput />` 창에 바뀐 값을 쑤셔넣어줄 수 있을 것이다. 그리고 `< TemperatureInput />`의 value 에는 onChange로 받은 state를 계산해서 넣어줘야 한다.
 ```
 <TemperatureInput
   scale="c"
    value={celsius}
    onChange={(e) => {
      this.setState({value: e, scale: 'c'})
      }
    }
 />
 ```

 - 이제 위에 짠 변환함수를 바탕으로 `Calculator` 의 `state` 에 따라서 알맞게 변환하여 `celsius` 와 `fahrenheit`라는 수치에 대입을 해주자. 그러기 위해선는 render 부분에 다음과 같이 각 변수에 state.scale 에 따라서 변화해준 후 적절한 값을 넣어주자.
 ```
 const value = this.state.value; // 코드가 너무 더러워져서 어쩔수 없이 상수에다가 calculator 의 state 중 value의 값을 넣음

 const celsius = this.state.scale === 'f' ? this.Converter(value, this.toCelsius) : value;

 const fahrenheit = this.state.scale === 'c' ? this.Converter(value, this.toFahrenheit) : value;
 // 각 변수에 state의 scale 에 따라서 변환할 필요가 잇으면 Converter 함수를 써서 변환해라

 ```
 - 이제 비로소 `<TemperatureInput />` 내부에 있는 value prop에 celcisus나 fahrenheit와 같은 변수들이 왜 들어가는 지 알 수 있다.


4. **완성단계 2**

  - `<BoilOrNot />` 컴포넌트를 `emperatureInput`에 넣어줬었다면 이제 다시 `Calculator`로 빼주자. 굳이 귀찮게 F로 계산하지 말고 우리는 그대로 C로 계산을 하자.

  - 이제 `<TemperatureInput />` 을 리팩토링 할 차례이다. 2단계에서는 모든 값을 `<TemperatureInput />` 내에서 처리해줬다면 이제는 우리가  `<TemperatureInput />` 에서 입력받은 값을 parent component 인 `<Calculator />`로 보내줘야 한다. textfield의 value 또한 받아온 props를 바탕으로 입력을 해주어야 한다. 따라서 다음과 같은 코드를 작성하면 되겠다.
  ```
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
  ```

  - 아직 쓰는 중입니다!
