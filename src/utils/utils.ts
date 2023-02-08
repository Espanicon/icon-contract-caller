import EspaniconSDKWeb from "@espanicon/espanicon-sdk";
import type {
  ContractAbiType,
  EspaniconSdkType,
  ErrorResponse,
  ProtocolType,
  UrlType,
} from "../types";

const networks = {
  mainnet: {
    nid: "1",
    hostname: "ctz.solidwallet.io",
  },
  lisbon: {
    nid: "2",
    hostname: "lisbon.net.solidwallet.io",
  },
  berlin: {
    nid: "7",
    hostname: "berlin.net.solidwallet.io",
  },
  sejong: {
    nid: "83",
    hostname: "sejong.net.solidwallet.io",
  },
  custom: {
    nid: "3",
    hostname: "",
  },
};

const urlRegex =
  /^((https|http):\/\/)?(([a-zA-Z0-9-]{1,}\.){1,}([a-zA-Z0-9]{1,63}))(:[0-9]{2,5})?(\/.*)?$/;

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
  custom: {
    governance: "cx0000000000000000000000000000000000000000",
    governance1: "cx0000000000000000000000000000000000000001",
  },
};

const routes = {
  v3: "/api/v3",
  proposals: "/api/v1/governance/proposals",
};

function isScoreValid(scoreAddress: string) {
  const regex = /([cC][xX][a-fA-F0-9]{40})$/;
  return regex.test(scoreAddress);
}

function isValidIconAddress(address: string) {
  const regex = /([hH][xX][a-fA-F0-9]{40})$/;
  return regex.test(address);
}

async function fetchAbi(
  contractAddress: string,
  nodeUrl: string,
  nid: string
): Promise<ContractAbiType> {
  const abi: ContractAbiType = [];
  try {
    // eslint-disable-next-line
    const sdk = new EspaniconSDKWeb(
      nodeUrl,
      nid
    ) as unknown as EspaniconSdkType;
    const response = await sdk.getScoreApi(contractAddress);
    if (Array.isArray(response)) {
      return response;
    } else {
      const errorResponse = response as unknown as ErrorResponse;
      if (errorResponse.error != null) {
        abi.push({
          name: "error",
          error: {
            code: errorResponse.error.code,
            message: errorResponse.error.message,
          },
        });
        throw new Error(response.error.message);
      }
    }
  } catch (err) {
    console.log("error fetching abi");
    console.log(err);
  }

  return abi;
}

function isValidUrl(urlString: string) {
  return urlRegex.test(urlString);
}

function makeUrlObject(rpcNode: string) {
  const inputInLowercase = rpcNode.toLowerCase();
  const parsedUrl: UrlType = {
    protocol: "https",
    path: "/",
    hostname: null,
    port: "443",
  };

  const regexResult = inputInLowercase.match(urlRegex);

  if (regexResult != null) {
    parsedUrl.protocol =
      regexResult[2] == null ? "https" : (regexResult[2] as ProtocolType);
    parsedUrl.path = regexResult[7] == null ? "/" : regexResult[7];
    parsedUrl.hostname = regexResult[3] == null ? rpcNode : regexResult[3];
    parsedUrl.port = regexResult[6] == null ? "" : regexResult[6].slice(1);
  }

  return parsedUrl;
}

const utils = {
  networks,
  networkKeys,
  contracts,
  routes,
  isScoreValid,
  isValidIconAddress,
  fetchAbi,
  isValidUrl,
  makeUrlObject,
};

export default utils;
