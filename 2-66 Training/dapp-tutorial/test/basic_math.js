const BasicMath = artifacts.require("BasicMath");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("BasicMath", function (/* accounts */) {
  // it("should assert true", async function () {
  //   await BasicMath.deployed();
  //   return assert.isTrue(true);   // assert คือ การตรวจสอบว่าค่าที่ได้มาตรงกับค่าที่เราต้องการหรือไม่
  // });
  it("should calculate total vaule", async function () {
    const bmContract = await BasicMath.deployed(); //await คือ การรอให้คำสั่งทำงานเสร็จก่อน จึงจะทำคำสั่งถัดไป
    const x = 3, y = 6, z = 12;
    const assertedValue = x + y + z;
    const result = await bmContract.sum(x, y, z);  // คำสั่งเรียกใช้ฟังก์ชัน sum จาก smart contract
    return assert.equal(result.toNumber(), assertedValue, "The sum function returns incorrect result");   // assert.equal คือ การตรวจสอบว่าค่าที่ได้มาตรงกับค่าที่เราต้องการหรือไม่
  });
  it("should calculate average value", async function () {
    const bmContract = await BasicMath.deployed();
    const x = 3, y = 6, z = 12;
    const assertedValue = (x + y + z) / 3;
    const result = await bmContract.average(x, y, z);
    return assert.equal(result.toNumber(), assertedValue, "The average function returns incorrect result");
  });
});
