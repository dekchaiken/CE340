// const WEB3_URL = "http://127.0.0.1:9545&quot;; // Truffle Develop
const WEB3_URL = "ws://127.0.0.1:9545"; // Ganache Standalone Emulator
let web3, accounts; // object library
let useWallet = false;
let balances = [];

async function getAccounts() {
    if(!window.ethereum || !useWallet) { // check against emulator existence
        try {
            accounts = await web3.eth.getAccounts();
        } catch (error) {
            console.log(error);
        }
    } else {
       
    }
    console.log(accounts);
}

async function getBalances() {
    for(let account of accounts) {
        try {
            const balance = await web3.eth.getBalance(account); // Balance (wei)
            // balances.push(web3.utils.fromWei(balance, 'ether'));
            balances.push(balance);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(balances);
}

async function initWeb3() {
    if(window.ethereum && useWallet) { // Crypto Wallet
        web3 = new Web3 (window.ethereum);
    } else { // No Wallet
        if(WEB3_URL.startsWith('ws')) { // Websocket
            web3 = new Web3 (new Web3.providers.WebsocketProvider(WEB3_URL));
        } else { // Http
            web3 = new Web3 (new Web3.providers.HttpProvider(WEB3_URL));
        }
    }
    console.log(web3);
    // await getAccounts();
    // await getBalances();
}