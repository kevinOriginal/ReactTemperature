## Temperature Calcuator


* React 만으로 입력받은 온도를 화씨<=> 섭씨 변환하며 물이 끓는 온도인지 아닌지를 판단하는 간단한 계산기 만든다.
* Project Hierarchy 는 다음과 같다.


* 만들때는 다음과 같은 순서를 따른다
1. BoilOrNot 과 Calculator Component 를 먼저 만든다. 섭씨(celcisus)온도를 입력받고 이가 끓는지 안끓는지 나타내주는 앱을 먼저 만들어 보자.

> `BoilOrNot` 는 섭씨(celcisus)의 입력값에 따라서 물이 끓는지 안끓는지 나타내주는 컴포넌트이다. 따로 저장할 state 가 있는가? 당연히 없다. 그러므로
**functional component** 로 만들어주면 되겠다.

> `Calculator` 는 온도를 입력하게 해주며, 이 온도를 자신의 state에 저장을 한다. 또한 `BoilOrNot`을 render 해주기도 하며 즉 그렇기 때문에 **class component** 가 되어야 겠다.


2. 섭씨 뿐만 아니라 화씨(fahrenheit)또한 입력받기 위해서는 온도를 입력받는 `TemperatureInput` 이라는 component를 만드는 편이 속시원할 것이다.

`TemperatureInput`은 화씨인지 섭씨인지 알기 위해서  
