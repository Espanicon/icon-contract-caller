import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import utils from "../utils/utils";
import {
  NetworksType,
  ContractAbiType,
  InitStateType,
  GlobalContextType,
} from "../types";

const initStates: InitStateType = {
  loggedWallet: "",
  networkState: utils.networkKeys[0]!,
  nodeUrl:
    utils.networks[utils.networkKeys[0]! as unknown as NetworksType].hostname,
  nodeUrlIsValid: true,
  nodeNid: utils.networks[utils.networkKeys[0]! as unknown as NetworksType].nid,
  contractAbi: [],
  readIsActive: true,
  contractAddress:
    utils.contracts[utils.networkKeys[0]! as NetworksType].governance,
  contractAddressIsValid: true,
  textAreaContent: {},
};

const GlobalContext = createContext<GlobalContextType>({
  loggedWallet: initStates.loggedWallet,
  networkState: initStates.networkState,
  nodeUrl: initStates.nodeUrl,
  nodeUrlIsValid: initStates.nodeUrlIsValid,
  nodeNid: initStates.nodeNid,
  contractAbi: initStates.contractAbi,
  readIsActive: initStates.readIsActive,
  contractAddress: initStates.contractAddress,
  contractAddressIsValid: initStates.contractAddressIsValid,
  textAreaContent: initStates.textAreaContent,
});

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [loggedWallet, setLoggedWallet] = useState<string>(
    initStates.loggedWallet
  );
  const [networkState, setNetworkState] = useState<string>(
    initStates.networkState
  );
  const [nodeUrl, setNodeUrl] = useState<string>(initStates.nodeUrl);
  const [nodeUrlIsValid, setNodeUrlIsValid] = useState(
    initStates.nodeUrlIsValid
  );
  const [nodeNid, setNodeNid] = useState<string>(initStates.nodeNid);
  const [contractAbi, setContractAbi] = useState<ContractAbiType>(
    initStates.contractAbi
  );
  const [readIsActive, setReadIsActive] = useState(initStates.readIsActive);
  const [contractAddress, setContractAddress] = useState(
    initStates.contractAddress
  );
  const [contractAddressIsValid, setContractAddressIsValid] = useState(
    initStates.contractAddressIsValid
  );

  const [textAreaContent, setTextAreaContent] = useState(
    initStates.textAreaContent
  );

  //
  //
  return (
    <GlobalContext.Provider
      value={{
        loggedWallet: loggedWallet,
        setLoggedWallet: setLoggedWallet,
        networkState: networkState,
        setNetworkState: setNetworkState,
        nodeUrl: nodeUrl,
        setNodeUrl: setNodeUrl,
        nodeUrlIsValid: nodeUrlIsValid,
        setNodeUrlIsValid: setNodeUrlIsValid,
        nodeNid: nodeNid,
        setNodeNid: setNodeNid,
        contractAbi: contractAbi,
        setContractAbi: setContractAbi,
        readIsActive: readIsActive,
        setReadIsActive: setReadIsActive,
        contractAddress: contractAddress,
        setContractAddress: setContractAddress,
        contractAddressIsValid: contractAddressIsValid,
        setContractAddressIsValid: setContractAddressIsValid,
        textAreaContent: textAreaContent,
        setTextAreaContent: setTextAreaContent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
