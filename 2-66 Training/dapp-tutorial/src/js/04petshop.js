const MY_PETSHOP_CONTRACT_ABI = "petshop.json";
let petshop;
let owner, buyer, currentAccount;
let initialized = false;

const deployContract = async () => {
    $.getJSON(MY_PETSHOP_CONTRACT_ABI, async contractABI => {
        try {
            const contract = TruffleContract(contractABI);
            contract.setProvider(web3.currentProvider);
            petshop = await contract.deployed();
            console.log(petshop);
        } catch (error) {
            console.log(error);
        }
    });
};

$(async () => {     // ทำงานเมื่อเว็บโหลดเสร็จ
    try {
        await setupPetshop();
        await initWeb3();
        await deployContract();
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
