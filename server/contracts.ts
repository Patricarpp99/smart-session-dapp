export const TARGET_ADDRESS =
  process.env.VITE_SMART_SESSION_TARGET_ADDRESS as `0x${string}`;

export const TARGET_ABI = [
  {
    type: "function",
    name: "store",
    stateMutability: "nonpayable",
    inputs: [{ name: "newNumber", type: "uint256" }],
    outputs: []
  },
  {
    type: "function",
    name: "get",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }]
  }
];