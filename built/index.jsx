import {_$elem} from "../core/dom";
    import { createSignal, createEffect } from "../core";
function Greet(props) {
  return _$elem("div", {
    children: [_$elem("h1", {
      children: ["Hello, ", () => `${props.firstName()} ${props.lastName()}`]
    })]
  });
}
function Counter() {
  const [count, setCount] = createSignal(0);
  return _$elem("div", {
    className: "counter-container",
    children: [_$elem("button", {
      onCLick: () => setCount(count() + 1),
      children: ["count : ", () => count()]
    }), _$elem("button", {
      onClick: () => setCount(count() + 2),
      children: ["double : ", () => count()]
    })]
  });
}
function Timer() {
  const [time, setTime] = createSignal(0);
  setInterval(() => setTime(time() + 1), 1000);
  return _$elem("h1", {
    children: ["time: ", () => time()]
  });
}
function App() {
  const [firstName, setFirstName] = createSignal("john");
  const [lastName, setLastName] = createSignal("doe");
  const [show, setShow] = createSignal(true);
  const [upper, setUpper] = createSignal("");
  createEffect(() => {
    setUpper(`${firstName()} ${lastName()}`.toUpperCase());
  });
  return _$elem("div", {
    className: "app-container",
    children: [_$elem("div", {
      className: "toggle-container",
      children: [() => show() && _$elem(Greet, {
        firstName: firstName,
        lastName: lastName,
        children: []
      }), _$elem("p", {
        style: {
          color: show() ? "pink" : "gray"
        },
        children: [() => upper()]
      }), _$elem("button", {
        onClick: () => setShow(!show()),
        children: ["toggle"]
      })]
    }), _$elem("div", {
      className: "input-container",
      children: [_$elem("input", {
        type: "text",
        value: firstName(),
        onInput: e => setFirstName(e.target.value),
        children: []
      }), _$elem("input", {
        type: "text",
        value: lastName(),
        onInput: e => setLastName(e.target.value),
        children: []
      })]
    }), _$elem(Counter, {
      children: []
    }), _$elem(Timer, {
      children: []
    })]
  });
}
export default App;