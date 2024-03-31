const Web3 = require('web3');
const ERC721PartialOwnership = require('./build/contracts/ERC721PartialOwnership.json');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));

const contractAddress = ERC721PartialOwnership.networks[5777].address; // แทนที่ <NETWORK_ID> ด้วย ID ของเครือข่ายที่คุณใช้งาน เช่น 5777 สำหรับ Ganache
const contract = new web3.eth.Contract(ERC721PartialOwnership.abi, contractAddress);

// เรียกใช้งาน contract.methods ได้ตามต้องการ
