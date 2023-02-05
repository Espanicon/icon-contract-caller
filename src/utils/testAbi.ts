const abi = [
  {
    inputs: [],
    name: "getRevision",
    outputs: [{ type: "int" }],
    readonly: "0x1",
    type: "function",
  },
  {
    inputs: [],
    name: "getVersion",
    outputs: [{ type: "str" }],
    readonly: "0x1",
    type: "function",
  },
  {
    inputs: [],
    name: "getStepPrice",
    outputs: [{ type: "int" }],
    readonly: "0x1",
    type: "function",
  },
  {
    inputs: [],
    name: "getStepCosts",
    outputs: [{ type: "dict" }],
    readonly: "0x1",
    type: "function",
  },
  {
    inputs: [{ name: "contextType", type: "str" }],
    name: "getMaxStepLimit",
    outputs: [{ type: "int" }],
    readonly: "0x1",
    type: "function",
  },
  {
    inputs: [{ name: "address", type: "Address" }],
    name: "getScoreStatus",
    outputs: [{ type: "dict" }],
    readonly: "0x1",
    type: "function",
  },
  {
    inputs: [{ name: "txHash", type: "bytes" }],
    name: "acceptScore",
    outputs: [],
    type: "function",
  },
  {
    inputs: [
      { name: "txHash", type: "bytes" },
      { name: "reason", type: "str" },
    ],
    name: "rejectScore",
    outputs: [],
    type: "function",
  },
  {
    inputs: [{ name: "address", type: "Address" }],
    name: "addAuditor",
    outputs: [],
    type: "function",
  },
  {
    inputs: [{ name: "address", type: "Address" }],
    name: "removeAuditor",
    outputs: [],
    type: "function",
  },
  {
    inputs: [{ name: "address", type: "Address" }],
    name: "isInScoreBlackList",
    outputs: [{ type: "bool" }],
    readonly: "0x1",
    type: "function",
  },
  {
    inputs: [{ name: "id", type: "bytes" }],
    name: "getProposal",
    outputs: [{ type: "dict" }],
    readonly: "0x1",
    type: "function",
  },
  {
    inputs: [
      { default: "0x0", name: "type", type: "int" },
      { default: "0x0", name: "status", type: "int" },
      { default: "0x0", name: "start", type: "int" },
      { default: "0x0", name: "size", type: "int" },
    ],
    name: "getProposals",
    outputs: [{ type: "dict" }],
    readonly: "0x1",
    type: "function",
  },
  {
    inputs: [
      { name: "title", type: "str" },
      { name: "description", type: "str" },
      { name: "value", type: "bytes" },
    ],
    name: "registerProposal",
    outputs: [],
    payable: "0x1",
    type: "function",
  },
  {
    inputs: [
      { name: "id", type: "bytes" },
      { name: "vote", type: "int" },
    ],
    name: "voteProposal",
    outputs: [],
    type: "function",
  },
  {
    inputs: [{ name: "id", type: "bytes" }],
    name: "applyProposal",
    outputs: [],
    type: "function",
  },
  {
    inputs: [{ name: "id", type: "bytes" }],
    name: "cancelProposal",
    outputs: [],
    type: "function",
  },
  { inputs: [], name: "onTimer", outputs: [], type: "function" },
  {
    inputs: [{ indexed: "0x1", name: "txHash", type: "bytes" }],
    name: "Accepted",
    type: "eventlog",
  },
  {
    inputs: [
      { indexed: "0x1", name: "txHash", type: "bytes" },
      { name: "reason", type: "str" },
    ],
    name: "Rejected",
    type: "eventlog",
  },
  {
    inputs: [{ indexed: "0x1", name: "stepPrice", type: "int" }],
    name: "StepPriceChanged",
    type: "eventlog",
  },
  {
    inputs: [
      { indexed: "0x1", name: "type", type: "str" },
      { name: "stepCost", type: "int" },
    ],
    name: "StepCostChanged",
    type: "eventlog",
  },
  {
    inputs: [{ name: "revisionCode", type: "int" }],
    name: "RevisionChanged",
    type: "eventlog",
  },
  {
    inputs: [
      { name: "address", type: "Address" },
      { name: "unFreeze", type: "int" },
    ],
    name: "MaliciousScore",
    type: "eventlog",
  },
  {
    inputs: [
      { name: "address", type: "Address" },
      { name: "success", type: "bool" },
      { name: "reason", type: "str" },
    ],
    name: "PRepDisqualified",
    type: "eventlog",
  },
  {
    inputs: [{ name: "rewardFund", type: "int" }],
    name: "RewardFundSettingChanged",
    type: "eventlog",
  },
  {
    inputs: [
      { name: "iprep", type: "int" },
      { name: "icps", type: "int" },
      { name: "irelay", type: "int" },
      { name: "ivoter", type: "int" },
    ],
    name: "RewardFundAllocationChanged",
    type: "eventlog",
  },
  {
    inputs: [{ indexed: "0x1", name: "address", type: "Address" }],
    name: "NetworkScoreUpdated",
    type: "eventlog",
  },
  {
    inputs: [
      { indexed: "0x1", name: "role", type: "str" },
      { name: "address", type: "Address" },
    ],
    name: "NetworkScoreDesignated",
    type: "eventlog",
  },
  {
    inputs: [{ indexed: "0x1", name: "role", type: "str" }],
    name: "NetworkScoreDeallocated",
    type: "eventlog",
  },
  {
    inputs: [
      { name: "title", type: "str" },
      { name: "description", type: "str" },
      { name: "type", type: "int" },
      { name: "value", type: "bytes" },
      { name: "proposer", type: "Address" },
    ],
    name: "NetworkProposalRegistered",
    type: "eventlog",
  },
  {
    inputs: [{ name: "id", type: "bytes" }],
    name: "NetworkProposalCanceled",
    type: "eventlog",
  },
  {
    inputs: [
      { name: "id", type: "bytes" },
      { name: "vote", type: "int" },
      { name: "voter", type: "Address" },
    ],
    name: "NetworkProposalVoted",
    type: "eventlog",
  },
  {
    inputs: [{ name: "id", type: "bytes" }],
    name: "NetworkProposalApproved",
    type: "eventlog",
  },
  {
    inputs: [{ name: "id", type: "bytes" }],
    name: "NetworkProposalDisapproved",
    type: "eventlog",
  },
  {
    inputs: [{ name: "id", type: "bytes" }],
    name: "NetworkProposalApplied",
    type: "eventlog",
  },
  {
    inputs: [{ name: "id", type: "bytes" }],
    name: "NetworkProposalExpired",
    type: "eventlog",
  },
];

export default abi;
