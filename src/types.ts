import type { Dispatch, MutableRefObject } from "react";
import type utils from "./utils/utils";

export interface StringDict {
  [key: string]: string;
}

export interface TextAreaContentDict {
  [key: string]: {
    [key: string]: string;
  };
}

export type InitStateType = {
  loggedWallet: string;
  walletIsValid: boolean;
  networkState: string;
  nodeUrl: string;
  nodeUrlIsValid: boolean;
  nodeNid: string;
  contractAbi: ContractAbiType;
  readIsActive: boolean;
  contractAddress: string;
  contractAddressIsValid: boolean;
  textAreaContent: TextAreaContentDict;
  methodRef: MutableRefObject<string>;
};

export type GlobalContextType = {
  loggedWallet: InitStateType["loggedWallet"];
  setLoggedWallet?: Dispatch<InitStateType["loggedWallet"]>;
  walletIsValid: boolean;
  setWalletIsValid?: Dispatch<boolean>;
  networkState: InitStateType["networkState"];
  setNetworkState?: Dispatch<InitStateType["networkState"]>;
  nodeUrl: InitStateType["nodeUrl"];
  setNodeUrl?: Dispatch<InitStateType["nodeUrl"]>;
  nodeUrlIsValid: InitStateType["nodeUrlIsValid"];
  setNodeUrlIsValid?: Dispatch<InitStateType["nodeUrlIsValid"]>;
  nodeNid: InitStateType["nodeNid"];
  setNodeNid?: Dispatch<InitStateType["nodeNid"]>;
  contractAbi: InitStateType["contractAbi"];
  setContractAbi?: Dispatch<InitStateType["contractAbi"]>;
  readIsActive: InitStateType["readIsActive"];
  setReadIsActive?: Dispatch<InitStateType["readIsActive"]>;
  contractAddress: InitStateType["contractAddress"];
  setContractAddress?: Dispatch<InitStateType["contractAddress"]>;
  contractAddressIsValid: InitStateType["contractAddressIsValid"];
  setContractAddressIsValid?: Dispatch<InitStateType["contractAddressIsValid"]>;
  textAreaContent: InitStateType["textAreaContent"];
  // setTextAreaContent?: Dispatch<CustomResponse>;
  // eslint-disable-next-line
  setTextAreaContent?: Dispatch<InitStateType["textAreaContent"]>;
  methodRef: MutableRefObject<string>;
};

export type ProtocolType = "https" | "http";

export type ParamsObjType = {
  [key: string]: string;
};

export type RpcObjType = {
  jsonrpc: string;
  method: string;
  id: string;
  params: {
    to: string;
    from?: string;
    stepLimit?: string;
    nid?: string;
    nonce?: string;
    version?: string;
    timestamp?: string;
    dataType: string;
    value?: string;
    data: {
      method: string;
      params?: {
        [key: string]: string;
      };
    };
  };
};

export type UrlType = {
  protocol: ProtocolType;
  hostname: string | null;
  path: string | null;
  port: string | null;
};

export type NetworksType = (typeof utils.networkKeys)[number];

type IO = Array<{ name: string; type: string }>;

export type AbiMethod = {
  inputs?: IO;
  name: string;
  outputs?: Array<{ type: string }>;
  readonly?: string;
  payable?: string;
  type?: string;
  error?: {
    code: number;
    message: string;
  };
};

export type ContractAbiType = Array<AbiMethod>;

export type ListPropsType = {
  contractAbi: ContractAbiType;
  navbarState: boolean;
};

export type MethodItemPropsType = {
  method: AbiMethod;
};

export type InputItemPropsType = {
  input: { name: string; type: string; value: string };
  index: number;
  handler: (data: string, index: number) => void;
};

export type NavbarPropsType = {
  navbarState: boolean;
  handleNavbarState: Dispatch<boolean>;
};

export type TextAreaResultPropsType = {
  label: string;
  text?: string;
};

export type ErrorResponse = {
  jsonrpc: string;
  id: number;
  error: {
    code: number;
    message: string;
  };
};

export type SuccessResponse = {
  jsonrpc: string;
  id: number;
  result: {
    [key: string]: string;
  };
};

export type PayloadType = {
  code?: number;
  mesage?: string;
  id: string;
  result?: {
    [key: string]: string;
  };
  error?: {
    [key: string]: string;
  };
};
export type CustomResponse = {
  jsonrpc?: string;
  id?: string;
  result?: {
    [key: string]: string;
  };
  error?: {
    code?: number;
    message?: string;
  };
};
type ReducedJsonRpc = {
  jsonrpc: string;
  id: string;
  method: string;
};

export type EspaniconSdkType = {
  getScoreApi: (arg0: string) => Promise<ContractAbiType | ErrorResponse>;
  queryMethod: (
    arg0: string,
    arg1: string,
    arg2: string,
    arg3: boolean,
    arg4: string | boolean
  ) => Promise<CustomResponse>;
  makeJSONRPCRequestObj: (arg0: string) => ReducedJsonRpc;
};

export type InputParamType = {
  name: string;
  value: string;
  type: string;
};
