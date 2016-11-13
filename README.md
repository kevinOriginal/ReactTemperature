## Temperature Calcuator


* React 만으로 입력받은 온도를 화씨<=> 섭씨 변환하며 물이 끓는 온도인지 아닌지를 판단하는 간단한 계산기 만든다.

* 본인의 실력에 따라서 다음과 같이 나누면 좋을 것이다.
  - 고수 : 아예 component 설계부터 본인이 짠다.
  - 중수 : Project Hierarchy 와 이 문서 밑에 설명되어 있는 설계 진행 단계들을 보면서 코드를 짜고 리팩토링한다.
  - 늅늅 : git checkout을 해가면서 답안의 코드를 조금씩 보며 과제를 한다.

* Project Hierarchy 는 다음과 같다.


* 만들때는 다음과 같은 순서를 따른다


1. BoilOrNot 과 Calculator Component 를 먼저 만든다. 섭씨(celcisus)온도를 입력받고 이가 끓는지 안끓는지 나타내주는 앱을 먼저 만들어 보자.

> `BoilOrNot` 는 섭씨(celcisus)의 입력값에 따라서 물이 끓는지 안끓는지 나타내주는 컴포넌트이다. 따로 저장할 state 가 있는가? 당연히 없다. 그러므로
**functional component** 로 만들어주면 되겠다.

> `Calculator` 는 온도를 입력하게 해주며, 이 온도를 자신의 state에 저장을 한다. 또한 `BoilOrNot`을 render 해주기도 하며 즉 그렇기 때문에 **class component** 가 되어야 겠다.


2. 섭씨 뿐만 아니라 화씨(fahrenheit)또한 입력받기 위해서는 온도를 입력받는 `TemperatureInput` 이라는 component를 따로 만드는 편이 속시원할 것이다.

> `TemperatureInput`은 화씨인지 섭씨인지 알기 위해서 이를 위한 구분자를 render()에 새로운 object로 넣어주면 될듯 하다. 다음과 같이 말이다.
```
const scaleNames = {
  c : 'Celsius',
  f : 'Fahrenheit'
}
```
`TemperatureInput`은 input을 입력받아 자신의 state에 저장을 해야 하므로 **class component** 가 되어야 할 것이다.
이제 `Calculator` 안에있던 input 부분과 value를 저장했던 state 대신에 `TemperatureInput` 을 두개 넣어주는 리팩토링을 해보자. 각각의 property는 "c" 와 "f"로 해주면 되겠다.

 여기까지 하면 View 에는 온도를 입력하는 창이 두개가 있고 각각 섭씨와 화씨 온도를 입력받으라고 하며 100도가 넘으면 물이 끓는다고 나온다. 하지만 문제점이 있다. 우리가 만들고싶은 것은 사실 두 온도를 입력했을때 서로 변환까지 해주면서 물이 끓는지 안끓는지를 나타내줘야한다.

 즉 **두 값을 연결** 해줘야 하며, C/F 변환 함수를 또한 만들어 줄 필요가 있다.


3. 완성 단계
여기서 부터 살짝 복잡해진다. 2단계 까지는 `TemperatureInput` 의 state 에만 모든 것을 저장했다면, 그 state를 갖다가 `Calculator`의 state에 저장을 해줘야 하며, `Calculator` 은 우리가 입력한 것이 C/F 둘중 어느것인지 구별을 해야 한다. 또한 구별된 것을 바탕으로 변환하는 함수를 적절히 활용해서 나머지 한쪽 Input을 바꾸어야 한다.

따라서 다음과 같은 Callback 과정을 거친다고 생각하면 된다.
`TemperatureInput` 의 **state** => `Calculator`의 state => C/F 변환 => `TemperatureInput` 의 prop으로 넘겨줘서 input에 다시 입력.

맨 먼저 `Calculator`의 state을 다움과 같이 만들어 준다.
 ```
 class Calculator extends React.Component {
   constructor(props) {
     super(props);
     this.state = {value: '', scale 'c'};
   }
```

그다음은 `Calculator` 에 
