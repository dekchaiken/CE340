const Web3 = require('web3');
const ERC721PartialOwnership = require('./build/contracts/ERC721PartialOwnership.json');

// Connect to the Ganache development network
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));

// Load the contract
const contractAddress = '0x868EABb722e29e887Bdb641b447ce15F08e548Ff'; // Replace with the deployed contract address
const contract = new web3.eth.Contract(ERC721PartialOwnership.abi, contractAddress);

// Call contract functions, e.g.:
contract.methods.mint(
  '0x793303e187ED167745D45894D5AA3A5B6C501041', // ที่อยู่ของผู้ถือสิทธิ์
  [100] // รายการของสิทธิ์ที่จะจัดสรร
).send({ from: '0x9038156f749D5cFd5a89E0E5Ac16808583E8594f' }) // อย่าลืมเปลี่ยนเป็นบัญชีที่มีเงินเพียงพอสำหรับการโอน
  .on('receipt', (receipt) => {
    console.log('Token minted:', receipt.events.Transfer.returnValues.tokenId);
  });
