import { createSignal } from "../core"

function Greet(props) {
    return (
        <div>
            <h1>Hello, {`${props.firstName()} ${props.lastName()}`}</h1>
        </div>
    )
}

function Counter() {
    const [count, setCount] = createSignal(0)
    return (
        <div>
            <button onCLick={() => setCount(count() + 1)}>
                count : {count()}
            </button>
            <button onClick={(() => setCount(count() + 2))}>
                double count : {count()}
            </button>
        </div>
    )
}


function Timer() {
    const [time, setTime] = createSignal(0)

    setInterval(() => setTime(time() + 1), 1000)

    return <h1>time: {time()}</h1>
}


function App() {
    const [firstName, setFirstName] = createSignal("john")
    const [lastName, setLastName] = createSignal("doe")
    const [show, setShow] = createSignal(true)

    return <div>
        {show() && <Greet firstName={firstName} lastName={lastName} />}
        <button onClick={() => setShow(!show())}>toggle</button>
        <input type="text" value={firstName()} onInput={(e) => setFirstName(e.target.value)} />
        <input type="text" value={lastName()} onInput={(e) => setLastName(e.target.value)} />
        <Counter />
        <Timer />
    </div>
}

export default App