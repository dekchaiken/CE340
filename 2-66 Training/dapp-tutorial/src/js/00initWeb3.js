// const WEB3_URL = "http://127.0.0.1:9545"; // Truffle Develop
const WEB3_URL = "http://127.0.0.1:9545"; // Ganache Standalone Emulator
let web3, accounts; // object library
let useWallet = true; // ใช้ MetaMask

async function getAccounts() {
  if (!window.ethereum || !useWallet) {
    // ถ้าไม่มี MetaMask หรือไม่ใช้ MetaMask
    try {
      accounts = await web3.eth.getAccounts();
    } catch (error) {
      console.log(error);
    }
  } else {
    // ถ้ามี MetaMask
    accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });

    // ติดตามการเปลี่ยนแปลงบัญชีผู้ใช้
    window.ethereum.on('accountsChanged', (acc) => accounts = acc);
  }
  console.log(accounts);
}

function getCurrentAccount() {
  if (typeof accounts != 'undefined') {
    if (Array.isArray(accounts) && accounts.length > 0) {
      return accounts[0];
    } else {
      return accounts;
    }
  }
  return null;
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
    if (window.ethereum && useWallet) {
      // Crypto Wallet
      web3 = new Web3(window.ethereum);
    } else {
      // No Wallet
      // Http
      web3 = new Web3(new Web3.providers.HttpProvider(WEB3_URL));
    }
    console.log(web3);
  }