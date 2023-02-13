import EspaniconSDKWeb from "@espanicon/espanicon-sdk";
import type {
  ContractAbiType,
  EspaniconSdkType,
  ErrorResponse,
  ProtocolType,
  UrlType,
  ParamsObjType,
  RpcObjType,
  InputParamType,
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

async function fetchAbiCustom(
  contractAddress: string,
  fullUrl: string
): Promise<ContractAbiType> {
  const abi: ContractAbiType = [];
  try {
    const urlObj = makeUrlObject(fullUrl);
    console.log(urlObj);
    if (urlObj.hostname != null) {
      // eslint-disable-next-line
      const sdk = new EspaniconSDKWeb(
        `${urlObj.hostname}/api/v3`,
        1
      ) as unknown as EspaniconSdkType;

      // make RPC request object
      const RPCObj = JSON.stringify({
        ...sdk.makeJSONRPCRequestObj("icx_getScoreApi"),
        params: {
          address: contractAddress,
        },
      });

      // make request
      const path = urlObj.path === "/" ? "/api/v3" : urlObj.path;
      const request = await sdk.queryMethod(
        // eslint-disable-next-line
        path!,
        RPCObj,
        urlObj.hostname,
        urlObj.protocol === "http" ? false : true,
        // eslint-disable-next-line
        urlObj.port!
      );

      if (request == null) {
        return [];
      } else {
        if (request.error == null) {
          return request.result as unknown as ContractAbiType;
        } else {
          const errorResponse = request as unknown as ErrorResponse;
          abi.push({
            name: "error",
            error: {
              code: errorResponse.error.code,
              message: errorResponse.error.message,
            },
          });
          throw new Error(request.error.message);
        }
      }
    }
  } catch (err) {
    console.log("error fetching abi");
    console.log(err);
  }
  return abi;
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

function getParamsFromArray(arr: Array<InputParamType>) {
  const result: ParamsObjType = {};

  if (arr.length > 0) {
    for (const each of arr) {
      result[each.name] = each.value;
    }
  }

  return result;
}

async function makeRpcCustomRequest(
  contract: string,
  method: string,
  url: string,
  params: ParamsObjType = {}
) {
  const rpcObj = makeJsonRpcObj(contract, method, params);
  const stringified = JSON.stringify(rpcObj);

  try {
    // eslint-disable-next-line
    const sdk = new EspaniconSDKWeb(
      `${url}/api/v3`,
      1
    ) as unknown as EspaniconSdkType;
    const query = await makeJsonRpcCall(stringified, url, sdk.queryMethod);
    return query;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function makeJsonRpcCall(
  data: string,
  url: string,
  queryMethod: EspaniconSdkType["queryMethod"]
) {
  try {
    const urlObj = makeUrlObject(url);
    const path = urlObj.path === "/" ? "/api/v3" : urlObj.path;
    const query = await queryMethod(
      // eslint-disable-next-line
      path!,
      data,
      // eslint-disable-next-line
      urlObj.hostname!,
      urlObj.protocol == "http" ? false : true,
      // eslint-disable-next-line
      urlObj.port == "" ? false : urlObj.port!
    );

    if (query != null) {
      return query;
    } else {
      return {
        error: {
          code: -1,
          message: "Error trying to make request to chain",
        },
      };
    }
  } catch (err) {
    console.log("Error trying to make request to chain");
    console.log(err);
    return {
      error: {
        code: -1,
        message: "Error trying to make request to chain",
      },
    };
  }
}

function makeJsonRpcObj(
  to: string,
  method: string,
  paramsObj: ParamsObjType = {},
  rpcMethod = "icx_call",
  from: string | null = null,
  nid: number | null = null,
  value: number | null = null,
  stepLimit = 2000000,
  nonce = 1,
  version = 3
) {
  const rpcObj: RpcObjType = {
    jsonrpc: "2.0",
    method: rpcMethod,
    id: method,
    params: {
      to: to,
      dataType: "call",
      data: {
        method: method,
      },
    },
  };
  if (from != null) {
    rpcObj.params.from = from;
    rpcObj.params.stepLimit = decimalToHex(stepLimit);
    rpcObj.params.nonce = decimalToHex(nonce);
    rpcObj.params.version = decimalToHex(version);
    rpcObj.params.timestamp = decimalToHex(new Date().getTime() * 1000);
  }

  if (nid != null) {
    rpcObj.params.nid = decimalToHex(nid);
  }

  if (value != null) {
    rpcObj.params.value = decimalToHex(value);
  }

  if (Object.keys(paramsObj).length > 0) {
    rpcObj.params.data.params = { ...paramsObj };
  }

  return rpcObj;
}

function decimalToHex(number: number) {
  return "0x" + number.toString(16);
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
  fetchAbiCustom,
  makeRpcCustomRequest,
  getParamsFromArray,
  makeJsonRpcObj,
};

export default utils;
