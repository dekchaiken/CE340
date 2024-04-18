const MY_ERC981_CONTRACT_ABI = "ERC981Token.json"; // เปลี่ยนเป็นชื่อ ABI ของ Smart Contract ERC981Token ที่คุณใช้
let erc981Token;
let owner, buyer, currentAccount;
let initialized = false;

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

const assets = [
  { id: 1, name: 'Ferrari F8 Tributo', description: 'A mid-engine sports car', price: 10 },
  { id: 2, name: 'Lamborghini Aventador SVJ', description: 'A mid-engine sports car', price: 15 },
  { id: 3, name: 'Bugatti Chiron', description: 'A mid-engine sports car', price: 20 },
];

// ฟังก์ชันสำหรับแสดงทรัพย์สิน
function renderAssets() {
  const assetsContainer = document.getElementById('assets');
  assetsContainer.innerHTML = '';

  assets.forEach((asset) => {
    const assetElement = document.createElement('div');
    assetElement.classList.add('asset');

    const nameElement = document.createElement('h3');
    nameElement.textContent = asset.name;
    assetElement.appendChild(nameElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = asset.description;
    assetElement.appendChild(descriptionElement);

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: ${asset.price} ETH`;
    assetElement.appendChild(priceElement);

    const buyButton = document.createElement('button');
    buyButton.classList.add('btn', 'btn-primary', 'btn-buy');
    buyButton.textContent = 'Buy Ownership';
    buyButton.addEventListener('click', () => buyOwnership(asset.id));
    assetElement.appendChild(buyButton);

    assetsContainer.appendChild(assetElement);
  });
}

// ฟังก์ชันสำหรับแสดงการถือครองทรัพย์สิน
function renderOwnerships() {
  const ownershipsContainer = document.getElementById('ownerships');
  ownershipsContainer.innerHTML = '';

  // ใส่โค้ดสำหรับดึงข้อมูลการถือครองทรัพย์สินจาก Smart Contract

  // ตัวอย่างการสร้างองค์ประกอบ UI สำหรับการถือครองทรัพย์สิน
  const ownershipElement = document.createElement('div');
  ownershipElement.classList.add('ownership');

  const nameElement = document.createElement('h3');
  nameElement.textContent = 'Ferrari F8 Tributo';
  ownershipElement.appendChild(nameElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = 'A mid-engine sports car';
  ownershipElement.appendChild(descriptionElement);

  const ownershipPercentageElement = document.createElement('p');
  ownershipPercentageElement.textContent = 'Ownership Percentage: 25%';
  ownershipElement.appendChild(ownershipPercentageElement);

  ownershipsContainer.appendChild(ownershipElement);
}

// ฟังก์ชันสำหรับซื้อการถือครองทรัพย์สิน
async function buyOwnership(assetId) {
  try {
    // ใส่โค้ดสำหรับเรียกใช้ฟังก์ชันซื้อการถือครองทรัพย์สินจาก Smart Contract
    console.log(`Buying ownership for asset ${assetId}`);
  } catch (error) {
    console.error(error);
  }
}

// เรียกใช้ฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
window.addEventListener('load', () => {
  renderAssets();
  renderOwnerships();
});