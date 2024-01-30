var BasicMath = artifacts.require("BasicMath"); // artifacts.require คือการเรียกใช้งาน contract ที่เราสร้าง

module.exports = function(deployer){
  deployer.deploy(BasicMath);
};