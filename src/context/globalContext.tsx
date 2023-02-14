import { createContext, useContext, useState, useRef } from "react";
import type { ReactNode } from "react";
import utils from "../utils/utils";
import type {
  NetworksType,
  ContractAbiType,
  InitStateType,
  GlobalContextType,
} from "../types";

const initStates: InitStateType = {
  loggedWallet: "",
  walletIsValid: false,
  // eslint-disable-next-line
  networkState: utils.networkKeys[0]!,
  nodeUrl:
    // eslint-disable-next-line
    utils.networks[utils.networkKeys[0]! as unknown as NetworksType].hostname,
  nodeUrlIsValid: true,
  // eslint-disable-next-line
  nodeNid: utils.networks[utils.networkKeys[0]! as unknown as NetworksType].nid,
  contractAbi: [],
  readIsActive: true,
  contractAddress:
    // eslint-disable-next-line
    utils.contracts[utils.networkKeys[0]! as NetworksType].governance,
  contractAddressIsValid: true,
  textAreaContent: {},
  methodRef: { current: "" },
};

const GlobalContext = createContext<GlobalContextType>({
  loggedWallet: initStates.loggedWallet,
  walletIsValid: initStates.walletIsValid,
  networkState: initStates.networkState,
  nodeUrl: initStates.nodeUrl,
  nodeUrlIsValid: initStates.nodeUrlIsValid,
  nodeNid: initStates.nodeNid,
  contractAbi: initStates.contractAbi,
  readIsActive: initStates.readIsActive,
  contractAddress: initStates.contractAddress,
  contractAddressIsValid: initStates.contractAddressIsValid,
  textAreaContent: initStates.textAreaContent,
  methodRef: initStates.methodRef,
});

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [loggedWallet, setLoggedWallet] = useState<string>(
    initStates.loggedWallet
  );
  const [walletIsValid, setWalletIsValid] = useState<boolean>(
    initStates.walletIsValid
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

  const methodRef = useRef("");

  //
  //
  return (
    <GlobalContext.Provider
      value={{
        loggedWallet: loggedWallet,
        setLoggedWallet: setLoggedWallet,
        walletIsValid: walletIsValid,
        setWalletIsValid: setWalletIsValid,
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
        methodRef: methodRef,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
