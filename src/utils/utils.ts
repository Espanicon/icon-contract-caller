const networks = {
  mainnet: {
    nid: 1,
    hostname: "ctz.solidwallet.io",
  },
  lisbon: {
    nid: 2,
    hostname: "lisbon.net.solidwallet.io",
  },
  berlin: {
    nid: 7,
    hostname: "berlin.net.solidwallet.io",
  },
  sejong: {
    nid: 83,
    hostname: "sejong.net.solidwallet.io",
  },
  custom: {
    nid: 3,
    hostname: "",
  },
};

const networkKeys = Object.keys(networks) as unknown as Array<
  keyof typeof networks
>;

const contracts = {
  mainnet: {
    governance: "cx0000000000000000000000000000000000000000",
    governance1: "cx0000000000000000000000000000000000000001",
  },
  lisbon: {
    governance: "cx0000000000000000000000000000000000000000",
    governance1: "cx0000000000000000000000000000000000000001",
  },
  berlin: {
    governance: "cx0000000000000000000000000000000000000000",
    governance1: "cx0000000000000000000000000000000000000001",
  },
  sejong: {
    governance: "cx0000000000000000000000000000000000000000",
    governance1: "cx0000000000000000000000000000000000000001",
  },
  custom: {},
};

const routes = {
  v3: "/api/v3",
  proposals: "/api/v1/governance/proposals",
};

const utils = {
  networks,
  networkKeys,
  contracts,
  routes,
};

export default utils;
