require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.2",
//   networks: {
//     rinkeby: {
//       url: "https://eth-mainnet.g.alchemy.com/v2/g5oIcR10t5HzqaMeMLrU3fmE57xXYrU1",
//       acounts: [
//         "e42fddcd2896c74495eca166a6852211c3a310a749fff4938a0f2bb530b6e1b7",
//       ],
//     },
//   },
// };
module.exports = {
  solidity: "0.8.2",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/FzW0NZEW6oMP7ZdnlUaFsWN_NfUMiXR7",
      accounts: [
        "e42fddcd2896c74495eca166a6852211c3a310a749fff4938a0f2bb530b6e1b7",
      ],
    },
  },
};
