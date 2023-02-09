import type { Dispatch } from "react";
import type utils from "./utils/utils";

export type InitStateType = {
  loggedWallet: string;
  networkState: string;
  nodeUrl: string;
  nodeUrlIsValid: boolean;
  nodeNid: string;
  contractAbi: ContractAbiType;
  readIsActive: boolean;
  contractAddress: string;
  contractAddressIsValid: boolean;
};

export type GlobalContextType = {
  loggedWallet: InitStateType["loggedWallet"];
  setLoggedWallet?: Dispatch<InitStateType["loggedWallet"]>;
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
};

export type ProtocolType = "https" | "http";

export type RpcObjType = {
  jsonrpc: string;
  method: string;
  id: number;
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
  input: { name: string; type: string };
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

export type EspaniconSdkType = {
  getScoreApi: (arg0: string) => Promise<ContractAbiType | ErrorResponse>;
};
