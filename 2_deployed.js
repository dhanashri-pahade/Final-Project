var TimeLockedWalletFactory = artifacts.require("TimeLockedWalletFactory");
var BlackToken = artifacts.require("BlackToken");

module.exports = function (deployer) {
  deployer.deploy(TimeLockedWalletFactory);
  deployer.deploy(BlackToken);
};
