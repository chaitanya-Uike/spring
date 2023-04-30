import { createEffect } from "."

export function _$elem(tag, props) {
    if (typeof tag === "function") return tag(props)
    const node = document.createElement(tag)
    props.children.forEach(child => {
        if (child instanceof HTMLElement)
            node.appendChild(child)
        else if (typeof child === "string")
            node.appendChild(document.createTextNode(child))
        else if (typeof child === "function")
            insert(node, child)
    })

    Object.keys(props).forEach((propName) => {
        if (propName === "children") return
        node[propName.toLowerCase()] = props[propName]
    })

    return node
}

function insert(container, effect) {
    let currentElement = null;
    let originalNextSibling = null;

    // the element may be a string so first convert it to textNode
    function createNode(element) {
        if (["string", "number"].includes(typeof element)) {
            return document.createTextNode(element);
        }
        return element;
    }

    function insertNode(newNode) {
        if (currentElement) {
            container.replaceChild(newNode, currentElement);
        } else {
            container.appendChild(newNode);
        }
        currentElement = newNode;
    }

    function removeNode() {
        if (currentElement) {
            originalNextSibling = currentElement.nextSibling;
            container.removeChild(currentElement);
            currentElement = null;
        }
    }

    function handleInsertion(node) {
        if (!currentElement && originalNextSibling) {
            container.insertBefore(node, originalNextSibling);
            currentElement = node
        } else {
            insertNode(node);
        }
    }

    createEffect(() => {
        const node = createNode(effect());
        if (node) handleInsertion(node)
        else removeNode()
    })
}