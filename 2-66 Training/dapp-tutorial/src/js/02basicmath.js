const BASIC_MATH_ABI = "BasicMath.json";
let bmContract;

$(async () => {
    await initWeb3();
    // Connect to smart contract
    await connectContract();

    // Setup buttons
    await setupButtons();
});

async function connectContract() {
    // Ajax loading of JSON ABI
    $.getJSON(BASIC_MATH_ABI, async contractABI => {
        // console.log(contractABI);
        const contract = TruffleContract(contractABI);  // Create Factory object
        contract.setProvider(web3.currentProvider);
        try {
            bmContract = await contract.deployed(); // Create contract proxy object
            // console.log(bmContract);
        } catch (error) {
            console.log(error);
        }
    });
}

function setupButtons() {
    // Attach Add button
    $("#add").click(async e => {
        console.log(e);
        const param1 = parseInt($("#add_param1").val());    // Get the value from the input field
        const param2 = parseInt($("#add_param2").val());    
        if(Number.isNaN(param1)){   // Check if the value is a number
            console.log("Add: Parameter #1 is NaN");    // Log the error
        } else if (Number.isNaN(param2)) {
            console.log("Add: Parameter #2 is NaN");
        } else {
            try {
                const result = await bmContract.add(param1, param2);    // Call the contract
                console.log(param1 + " + " + param2 + " = " + result);    // Show the result
                alert(param1 + " + " + param2 + " = " + result);    // Show the result
                $("#add_param1").val("");   // Clear the input field
                $("#add_param2").val("");   // Clear the input field
            } catch (error) {
                console.log(error);
            }
        }
    });
    // attach Subtract button
    $("#subtract").click(async e => {
        console.log(e);
        const param1 = parseInt($("#add_param1").val());
        const param2 = parseInt($("#add_param2").val());
        if(Number.isNaN(param1)){
            console.log("Subtract: Parameter #1 is NaN");
        } else if (Number.isNaN(param2)) {
            console.log("Subtract: Parameter #2 is NaN");
        } else {
            try {
                const result = await bmContract.subtract(param1, param2);
                console.log(param1 + " - " + param2 + " = " + result);
                alert(param1 + " - " + param2 + " = " + result);
                $("#add_param1").val("");
                $("#add_param2").val("");
            } catch (error) {
                console.log(error);
            }
        }
    });
    // attach Multiply button
    $("#multiply").click(async e => {
        console.log(e);
        const param1 = parseInt($("#add_param1").val());
        const param2 = parseInt($("#add_param2").val());
        if(Number.isNaN(param1)){
            console.log("Multiply: Parameter #1 is NaN");
        } else if (Number.isNaN(param2)) {
            console.log("Multiply: Parameter #2 is NaN");
        } else {
            try {
                const result = await bmContract.multiply(param1, param2);
                console.log(param1 + " * " + param2 + " = " + result);
                alert(param1 + " * " + param2 + " = " + result);
                $("#add_param1").val("");
                $("#add_param2").val("");
            } catch (error) {
                console.log(error);
            }
        }
    });
    // attach Divide button
    $("#divide").click(async e => {
        console.log(e);
        const param1 = parseInt($("#add_param1").val());
        const param2 = parseInt($("#add_param2").val());
        if(Number.isNaN(param1)){
            console.log("Divide: Parameter #1 is NaN");
        } else if (Number.isNaN(param2)) {
            console.log("Divide: Parameter #2 is NaN");
        } else {
            try {
                const result = await bmContract.divide(param1, param2);
                console.log(param1 + " / " + param2 + " = " + result);
                alert(param1 + " / " + param2 + " = " + result);
                $("#add_param1").val("");
                $("#add_param2").val("");
            } catch (error) {
                console.log(error);
            }
        }
    });
    // attach Sum button
    $("#sum").click(async e => {
        console.log(e);
        const param1 = parseInt($("#add_param1").val());
        const param2 = parseInt($("#add_param2").val());
        const param3 = parseInt($("#add_param3").val());
        if(Number.isNaN(param1)){
            console.log("Sum: Parameter #1 is NaN");
        } else if (Number.isNaN(param2)) {
            console.log("Sum: Parameter #2 is NaN");
        } else if (Number.isNaN(param3)) {
            console.log("Sum: Parameter #3 is NaN");
        } else {
            try {
                const result = await bmContract.sum(param1, param2, param3);
                console.log(param1 + " + " + param2 + " + " + param3 + " = " + result);
                alert(param1 + " + " + param2 + " + " + param3 + " = " + result);
                $("#add_param1").val("");
                $("#add_param2").val("");
                $("#add_param3").val("");
            } catch (error) {
                console.log(error);
            }
        }
    });
    // attach Average button
    $("#average").click(async e => {
        console.log(e);
        const param1 = parseInt($("#add_param1").val());
        const param2 = parseInt($("#add_param2").val());
        const param3 = parseInt($("#add_param3").val());
        if(Number.isNaN(param1)){
            console.log("Average: Parameter #1 is NaN");
        } else if (Number.isNaN(param2)) {
            console.log("Average: Parameter #2 is NaN");
        } else if (Number.isNaN(param3)) {
            console.log("Average: Parameter #3 is NaN");
        } else {
            try {
                const result = await bmContract.average(param1, param2, param3);
                console.log("Average of " + param1 + ", " + param2 + ", " + param3 + " = " + result);
                alert("Average of " + param1 + ", " + param2 + ", " + param3 + " = " + result);
                $("#add_param1").val("");
                $("#add_param2").val("");
                $("#add_param3").val("");
            } catch (error) {
                console.log(error);
            }
        }
    });
}