// const WEB3_URL = "http://127.0.0.1:9545";   //Truffle Develop
const WEB3_URL = "ws://127.0.0.1:9545";   //Ganache Standalone Emulator
let web3, accounts; // ตัวแปรสำหรับเก็บ Web3 และ Account

async function getAccount() {
    if(!window.ethereum && typeof WEB3_URL != 'undefined'){  //  Check against emulated
        try {
            accounts = await web3.eth.getAccounts();
        } catch (error) {
            console.error(error);
        }
        console.log(accounts);
    }
}


async function initWeb3() {
    if(window.ethereum){ //ถ้ามี Wallet
        web3 = new Web3 (window.ethereum);
    }  else{  //ถ้าไม่มี wallet 
        if(WEB3_URL.startsWith("ws")) //ถ้าเป็น Websocket
            web3 = new Web3 (new Web3.providers.WebsocketProvider(WEB3_URL));
        else  //http
            web3 = new Web3 (new Web3.providers.HttpProvider(WEB3_URL));
    }
    getAccount();
}

initWeb3(); //เรียกใช้งาน