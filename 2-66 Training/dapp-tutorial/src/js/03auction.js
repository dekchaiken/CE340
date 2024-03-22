const MY_AUCTION_CONTRACT_ABI = "MyAuction.json";
let myAuction;
let owner, bidder, currentAccount;
let initialized = false;
const AUCTION_STATE = ['STARTED', 'ENDED', 'CANCELLED', 'DESTRUCTED'];

const deployContract = async () => {
    $.getJSON(MY_AUCTION_CONTRACT_ABI, async contractABI => {
        try {
            const contract = TruffleContract(contractABI);
            contract.setProvider(web3.currentProvider);
            myAuction = await contract.deployed();
            console.log(myAuction);
        } catch (error) {
            console.log(error);
        }
    })
}

const formatBalance = balance => Number(web3.utils.fromWei(balance, "ether")).toFixed(6);
console.log(formatBalance);
// Populate account dropdown
const updateAccounts = async () => {
    await getBalances();
    owner = accounts[0];
    let htmlString = "<option>Select Account</option>";
    for (let i = 0; i < accounts.length; i++) {
        htmlString += `<option value="${i}">${accounts[i]} (${formatBalance(balances[i])} ETH)</option>`;
    }
    $("#AccountList").html(htmlString);

    if (!initialized) { // ถ้าเป็นครั้งแรกที่เข้ามา
        initialized = true;
    } else {
        return;
    }
    // ถ้า select มีการเปลี่ยนแปลง
    $('#AccountList').on('change', async e => {
        currentAccount = e.target.value;    // เก็บค่า Value ที่เลือกไว้จาก dropdown
        bidder = accounts[currentAccount];
        const myBid = await myAuction.getMyBid(bidder);
        $("#MyBid").text(formatBalance(myBid) + ' Ether');
        // console.log(bidder);
    });

};

$(async () => {
    try {
        await initWeb3();
        await deployContract();
        await getAccounts();
        await updateAccounts();
    } catch (error) {
        console.log(error);
    }
    console.log('Accounts:', accounts);
    console.log('Balances:', balances);
});

// const getAccounts = async () => {
//     accounts = await web3.eth.getAccounts();    // ดึงข้อมูล account ทั้งหมด
//     if (!Array.isArray(accounts) || accounts.length === 0) {
//         throw new Error("ERROR: Unable to get accounts");   // เป็นการสร้าง error ขึ้นมาเอง
//     }
// };
