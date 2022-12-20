const textElement = document.getElementById('question')
const optionButtonsElement = document.getElementById('option-buttons')
let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);

    textElement.innerText = textNode.text;

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button);
        }
    })
};


function showOption(option) {

    return option.requiredState == null || option.requiredState(state)
}
function selectOption(option) {
    let nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'you wake up in a stange place and see a jar of blue goo near you.',
        options: [
            {
                text: 'take the goo',
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: 'leave the goo',
                nextText: 2
            },
        ]
    },
    {
        id: 2,
        text: 'you venture forth in search of answers to here you are when you come acrross a merchant .',
        options: [
            {
                text: 'trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: 'trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {
                    blueGoo: false, shield: true
                },
                nextText: 3
            },
            {
                text: 'ignore the merchant',
                nextText: 3
            },

        ],
    },
    {
        id: 3,
        text: 'after leaving the merchant you start to feel tired and stand upon a small town next to a dangerous looking castle.',
        options: [
            {
                text: 'Explore the castle',

                nextText: 4
            },
            {
                text: 'Find a room to sleep at in the town',
                nextText: 5
            },
            {
                text: 'Find some hay in a stable to sleep in',
                nextText: 6
            }

        ]

    },
    {
        id: 4,
        text: 'you are tired so you fall asleep while you explor the castle and the monster kiild you in your sleep.',
        options: [
            {
                text: 'restart',
                nextText: 0
            }
        ]
    }
]


startGame()

