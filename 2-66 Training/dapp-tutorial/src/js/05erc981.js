const MY_ERC981_CONTRACT_ABI = "ERC981Token.json"; // เปลี่ยนเป็นชื่อ ABI ของ Smart Contract ERC981Token ที่คุณใช้
let erc981Token;
let owner, buyer, currentAccount;
let initialized = false;

const deployContract = async () => {
  $.getJSON(MY_ERC981_CONTRACT_ABI, async (contractABI) => {
    try {
      const contract = TruffleContract(contractABI);
      contract.setProvider(web3.currentProvider);
      erc981Token = await contract.deployed();
      console.log(erc981Token);

      // ดึงข้อมูลเจ้าของและสัดส่วนการถือครอง
      const owners = await erc981Token.methods.getOwners().call();
      const shares = await erc981Token.methods.getShares().call();

      // แสดงผลบนเว็บไซต์
      const ownershipList = document.getElementById("ownership-list");
      ownershipList.innerHTML = "";
      for (let i = 0; i < owners.length; i++) {
        const ownerItem = document.createElement("li");
        ownerItem.textContent = `${owners[i]}: ${shares[i]}%`;
        ownershipList.appendChild(ownerItem);
      }

      // เรียกใช้ฟังก์ชัน displayOwnershipData ตรงนี้
      const tokenId = 1; // ตัวอย่างการแสดงข้อมูลสำหรับ Token ID 1
  await displayOwnershipData(tokenId);
  await displayItemInfo(tokenId);
    } catch (error) {
      console.log(error);
    }
  });
};

$(async () => {
  try {
    await initWeb3();
    await getAccounts();
    currentAccount = getCurrentAccount();
    await deployContract();
    const tokenId = 1; // ตัวอย่างการแสดงข้อมูลสำหรับ Token ID 1
    await displayOwnershipData(tokenId);
  } catch (error) {
    console.log(error);
  }
});

const displayOwnershipData = async (tokenId) => {
  try {
    const ownershipData = await erc981Token.methods.ownershipOf(tokenId).call();
    const owners = ownershipData[0];
    const shares = ownershipData[1];

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
};

const shareOwnership = async () => {
  const tokenId = document.getElementById("token-id").value;
  const newOwnersInput = document.getElementById("new-owners").value;
  const newSharesInput = document.getElementById("new-shares").value;

  const newOwners = newOwnersInput.split(",").map((owner) => owner.trim());
  const newShares = newSharesInput.split(",").map((share) => parseInt(share.trim()));

  try {
    await erc981Token.methods.shareOwnership(tokenId, newOwners, newShares).send({ from: currentAccount });
    alert("Ownership shared successfully!");
  } catch (error) {
    console.log(error);
    alert("Error sharing ownership.");
  }
};

const displayItemInfo = async (tokenId) => {
  try {
    const ownershipData = await erc981Token.methods.ownershipOf(tokenId).call();
    const owners = ownershipData[0];
    const shares = ownershipData[1];

    const itemName = document.getElementById("item-name");
    const itemDescription = document.getElementById("item-description");

    // แสดงชื่อเจ้าของรถ
    const ownersString = owners.join(", ");
    itemName.textContent = `${ownersString}'s McLaren 720S`;

    // แสดงคำอธิบายรถ
    itemDescription.textContent = "SuperCar with multiple owners";
  } catch (error) {
    console.log(error);
  }
};

// const getAccounts = async () => {
//     accounts = await web3.eth.getAccounts();    // ดึงข้อมูล account ทั้งหมด
//     if (!Array.isArray(accounts) || accounts.length === 0) {
//         throw new Error("ERROR: Unable to get accounts");   // เป็นการสร้าง error ขึ้นมาเอง
//     }
// };
