// initweb3.js
let web3;
let useWallet = true; // ใช้ MetaMask หรือไม่ 

async function initWeb3() {
  if (window.ethereum && useWallet) {
    // Crypto Wallet
    web3 = new Web3(window.ethereum);
  } else {
    // No Wallet
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
    web3 = new Web3(provider);
  }
}

initWeb3();