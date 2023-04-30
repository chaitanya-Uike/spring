const context = [];

export function createSignal(initialValue) {
    let value = initialValue;
    const subscriptions = new Set();
    const getValue = () => {
        const running = getCurrentObserver()
        if (running) {
            subscriptions.add(running);
        }
        return value;
    };
    const setValue = (newValue) => {
        if (value !== newValue) {
            value = newValue;
            for (const subscription of subscriptions) {
                subscription();
            }
        }
    };
    return [getValue, setValue];
}

export function createEffect(callback) {
    context.push(callback)
    try {
        callback()
    } finally {
        context.pop()
    }
}

function getCurrentObserver() {
    return context[context.length - 1];
}