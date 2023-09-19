App = {
    contracts: {},
    load: async () => {
        await App.connectMeta()
        await App.loadContract()
    },
    connectMeta: async () => {
        const ethButton = document.querySelector('.enableEthereumButton');
        const showAccount = document.querySelector('.showAccount');

        ethButton.addEventListener('click', () => {
            getAccount();
        });

        async function getAccount() {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            showAccount.innerHTML = account;

            ethereum.on("chainChanged", () => window.location.reload());
            ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    console.log(`Using Account ${accounts[0]}`);
                }
                else {
                    console.error("0 accounts");
                }
            });

            ethereum.on("message", (message) => console.log(message));
            ethereum.on("connect", (info) => {
                console.log(`CONNECTED TO NETWORK ${info}`);
            })
        }
    },

    loadContract: async () => {
        const token = await $.getJSON('BlackToken.json')
        const wallet = await $.getJSON('TimeLockedWalletFactory.json')
        App.contracts.BlackToken = TruffleContract(token)
        App.contracts.TimeLockedWalletFactory = TruffleContract(wallet)
        const provider = window.ethereum
        App.contracts.BlackToken.setProvider(provider)
    },

    render: async () => {

    }
}
$(() => {
    $(window).load(() => {
        App.load()
    })
})
