
chrome.runtime.sendMessage({
    sender: 'content',
    action: 'select-network',
    payload: location.href.match(/dapp\.test/) ? 'testNet' : 'mainNet'
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.sender === 'popup') {
        switch (message.action) {
            case 'insert-tdt': {
                const input = document.getElementById('deposit-address')

                if (input) {
                    input.setAttribute("value", message.payload)
                }
                break;
            }
        }
    }
    sendResponse('Hello from content script')
})


