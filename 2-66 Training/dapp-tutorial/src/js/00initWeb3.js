// const WEB3_URL = "http://127.0.0.1:9545/"
const WEB3_URL = "ws://127.0.0.1:9545/"
let web3, accounts;
const userWallet = false;
let balances = [];


// Get Accounts จาก Emulator ที่กำลังทำงานอยู่
async function getAccounts() {
    // Check ดูว่ามี window.ethereum หรือไม่
    if (!window.ethereum || !userWallet) {
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
    for (const account of accounts) {
        try {
           const balance = await web3.eth.getBalance(account);
           balances.push(web3.utils.fromWei(balance, "ether"));
        } catch (error) {
            console.log(error);
        }
    }
    console.log(balances);
}

async function initWeb3() {
    // Check window.ethereum
    if (window.ethereum && userWallet) {
        web3 = new Web3(window.ethereum);
    } else {
        // startwith ใช้เช็คว่าเริ่มต้นด้วยอะไร
        if (WEB3_URL.startsWith("ws")) {
            web3 = new Web3(new Web3.providers.WebsocketProvider(WEB3_URL));
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider(WEB3_URL));
        }
    }
    // console.log(web3);
    await getAccounts();
    await getBalances();
}