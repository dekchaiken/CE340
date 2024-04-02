const MY_ERC981_CONTRACT_ABI = "ERC981Token.json"; // เปลี่ยนเป็นชื่อ ABI ของ Smart Contract ERC981Token ที่คุณใช้
let erc981Token;
let owner, buyer, currentAccount;
let initialized = false;

const deployContract = async () => {
  $.getJSON(MY_ERC981_CONTRACT_ABI, async (contractABI) => {
    // ปรับให้โหลด ABI ของ Smart Contract ERC981Token
    try {
      const contract = TruffleContract(contractABI);
      contract.setProvider(web3.currentProvider);
      erc981Token = await contract.deployed();
      console.log(erc981Token);

      // ดึงข้อมูลเจ้าของและสัดส่วนการถือครอง
      const owners = await erc981Token.getOwners();
      const shares = await erc981Token.getShares();

      // แสดงผลบนเว็บไซต์
      const ownershipList = document.getElementById("ownership-list");
      ownershipList.innerHTML = "";
      for (let i = 0; i < owners.length; i++) {
        const ownerItem = document.createElement("li");
        ownerItem.textContent = `${owners[i]}: ${shares[i]}%`;
        ownershipList.appendChild(ownerItem);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

$(async () => {
  // ทำงานเมื่อเว็บโหลดเสร็จ
  try {
    await initWeb3();
    await deployContract();
    
  } catch (error) {
    console.log(error);
  }
  console.log("Accounts:", accounts);
  console.log("Balances:", balances);
});

// const getAccounts = async () => {
//     accounts = await web3.eth.getAccounts();    // ดึงข้อมูล account ทั้งหมด
//     if (!Array.isArray(accounts) || accounts.length === 0) {
//         throw new Error("ERROR: Unable to get accounts");   // เป็นการสร้าง error ขึ้นมาเอง
//     }
// };
