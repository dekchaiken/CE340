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

const displayStaticInfo = async () => {
    owner = accounts[0];
    $('#AuctionOwner').text(owner);
    const endTime = await myAuction.auctionEnd.call();
    $('#AuctionEnd').text(new Date(endTime * 1000));
    const productInfo = await myAuction.getProductInfo.call();
    $('#ProductBrand').text(productInfo[0]);
    $('#SerialNumber').text(productInfo[1]);
};

const updateInfo = async () => {
    const highestBidder = await myAuction.highestBidder.call();
    const highestBid = await myAuction.highestBid.call();
    const myBidWei = await myAuction.getMyBid(bidder);  // wei
    const myBid = web3.utils.fromWei(myBidWei);
    const currentState = await myAuction.STATE.call();
    $('#HighestBidder').text(highestBidder);
    $('#HighestBid').text(highestBid);
    $('#State').text(AUCTION_STATE[currentState]);
    $('#MyBid').text(myBid + ' Ether');
};

const bid = async () => {
    const myBid = $('Value').val();
    let result;
    try {
        result = myAuction.bid({
            from: bidder,
            value: web3.utils.toWei(myBid, "Ether")
        });
    } catch (error) {
        console.log(error);
    }
};
const endAuction = async () => {
    let result;
    try {
        result = myAuction.endAuction({from: owner,});
    } catch (error) {
        console.log(error);
    }
};
const cancelAuction = async () => {
    let result;
    try {
        result = myAuction.cancelAuction({from: owner,});
    } catch (error) {
        console.log(error);
    }
};

$(async () => {
    try {
        await initWeb3();
        await deployContract();
        await getAccounts();
        await updateAccounts();
        await displayStaticInfo();
        await updateInfo();
        $('#Bid').click(bid);
        $('#End').click(endAuction);
        $('#Cancel').click(cancelAuction);
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
