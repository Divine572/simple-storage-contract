const fs = require("fs");
const solc = require("solc");

const input = fs.readFileSync("SimpleStorage.sol", "utf8");

const output = solc.compile(
  JSON.stringify({
    language: "Solidity",
    sources: {
      "SimpleStorage.sol": {
        content: input,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  })
);

const { SimpleStorage } = JSON.parse(output).contracts["SimpleStorage.sol"];
fs.writeFileSync("SimpleStorage.abi", JSON.stringify(SimpleStorage.abi));
fs.writeFileSync("SimpleStorage.bin", SimpleStorage.evm.bytecode.object);