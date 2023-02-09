import { useEffect } from "react";
import type { ChangeEvent } from "react";
import Navbar from "./navbar";
import ListOfMethods from "./listOfMethods";
import TextAreaResult from "./textAreaResult";
import type { NetworksType, RpcObjType } from "../types";
import { useGlobalContext } from "../context/globalContext";

import utils from "../utils/utils";

function dispatchTxEvent(query: RpcObjType) {
  window.dispatchEvent(
    new CustomEvent("ICONEX_RELAY_REQUEST", {
      detail: {
        type: "REQUEST_JSON-RPC",
        payload: query,
      },
    })
  );
}

function dispatchEventForLogin() {
  window.dispatchEvent(
    new CustomEvent("ICONEX_RELAY_REQUEST", {
      detail: {
        type: "REQUEST_ADDRESS",
      },
    })
  );
}

export default function Dashboard() {
  const {
    loggedWallet,
    setLoggedWallet,
    networkState,
    setNetworkState,
    nodeUrl,
    setNodeUrl,
    nodeUrlIsValid,
    setNodeUrlIsValid,
    nodeNid,
    setNodeNid,
    contractAbi,
    setContractAbi,
    readIsActive,
    setReadIsActive,
    contractAddress,
    setContractAddress,
    contractAddressIsValid,
    setContractAddressIsValid,
  } = useGlobalContext();

  function handleLogin(wallet: string) {
    if (setLoggedWallet != null) {
      setLoggedWallet(wallet);
    }
  }

  function handleLogout() {
    if (setLoggedWallet != null) {
      setLoggedWallet("");
    }
  }

  function handleNetworkChange(evnt: ChangeEvent<HTMLSelectElement>) {
    if (setNetworkState != null && setNodeUrl != null && setNodeNid != null) {
      setNetworkState(evnt.target.value);
      setNodeUrl(
        utils.networks[evnt.target.value as unknown as NetworksType].hostname
      );
      setNodeNid(
        utils.networks[evnt.target.value as unknown as NetworksType].nid
      );
    }
  }

  function handleCustomNetworkChange(evnt: ChangeEvent<HTMLInputElement>) {
    if (setNodeUrl != null) {
      setNodeUrl(evnt.target.value);
    }
  }

  function handleCustomNetworkNidChange(evnt: ChangeEvent<HTMLInputElement>) {
    const newValue = parseInt(evnt.target.value);

    if (!Number.isNaN(newValue) && setNodeNid != null) {
      setNodeNid(newValue.toString());
    }

    if (evnt.target.value === "" && setNodeNid != null) {
      setNodeNid("");
    }
  }

  function handleContractAddressChange(evnt: ChangeEvent<HTMLInputElement>) {
    if (setContractAddressIsValid != null && setContractAddress != null) {
      const isValid = utils.isScoreValid(evnt.target.value);
      setContractAddressIsValid(isValid);
      setContractAddress(evnt.target.value);
    }
  }

  function handleReadIsActive(state: boolean) {
    if (setReadIsActive != null) {
      setReadIsActive(state);
    }
  }

  useEffect(() => {
    async function fetchAbi(network: string, nid: string) {
      if (setContractAbi != null) {
        const abi = await utils.fetchAbi(contractAddress, network, nid);
        setContractAbi(abi);
      }
    }

    if (contractAddressIsValid && nodeUrlIsValid) {
      const network = nodeUrl;
      const nid = nodeNid;
      fetchAbi(network, nid);
    } else {
      if (setContractAbi != null) {
        setContractAbi([]);
      }
    }

    if (utils.isValidUrl(nodeUrl)) {
      if (setNodeUrlIsValid != null) {
        setNodeUrlIsValid(true);
      }
    } else {
      if (setNodeUrlIsValid != null) {
        setNodeUrlIsValid(false);
      }
    }
  }, [
    contractAddressIsValid,
    contractAddress,
    networkState,
    nodeUrl,
    nodeNid,
    nodeUrlIsValid,
  ]);

  useEffect(() => {
    function walletResponseEventHandler(event: any) {
      const { type, payload } = event.detail;

      switch (type) {
        case "RESPONSE_ADDRESS":
          handleLogin(payload as string);
          break;
        case "CANCEL":
          break;
        case "RESPONSE_JSON-RPC":
          break;
        case "CANCEL_JSON-RPC":
          break;
        default:
      }
    }

    window.addEventListener(
      "ICONEX_RELAY_RESPONSE",
      walletResponseEventHandler
    );

    return function cleanUp() {
      window.removeEventListener(
        "ICONEX_RELAY_RESPONSE",
        walletResponseEventHandler
      );
    };
  }, []);

  return (
    <div className="w-full min-w-min max-w-screen-xl overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="max-w-screen-md p-2">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            Select Network (hostname and nid):
          </label>
          <div className="flex flex-wrap content-center">
            <select
              name="network"
              className="my-1 mr-1 block rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={networkState}
              onChange={handleNetworkChange}
            >
              {utils.networkKeys.map((each, index) => {
                return <option key={`${each}-${index}`}>{each}</option>;
              })}
            </select>
            {networkState === "custom" ? (
              <div className="flex flex-1 flex-row content-center">
                <input
                  type="text"
                  name="text"
                  id="text"
                  className={`${
                    nodeUrlIsValid ? "border-green-300" : "border-red-300"
                  } m-1 flex-auto grow rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  value={nodeUrl}
                  onChange={handleCustomNetworkChange}
                  placeholder="hostname"
                />
                <input
                  type="text"
                  name="text"
                  id="text"
                  className="my-1 w-min rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={nodeNid}
                  onChange={handleCustomNetworkNidChange}
                  placeholder="nid"
                />
              </div>
            ) : (
              <div className="flex flex-1 flex-row content-center">
                <input
                  readOnly={true}
                  type="text"
                  name="text"
                  id="text"
                  className={`${
                    nodeUrlIsValid ? "border-green-300" : "border-red-300"
                  } m-1 flex-auto grow rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  value={nodeUrl}
                />
                <input
                  readOnly={true}
                  type="text"
                  name="text"
                  id="text"
                  className="my-1 w-min rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={nodeNid}
                />
              </div>
            )}
          </div>
        </div>
        <div className="max-w-screen-md p-2">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            Select wallet:
          </label>
          <div className="mt-1 flex flex-row">
            <input
              readOnly={true}
              type="text"
              name="text"
              className="block flex-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
              placeholder="hx0000..000"
              value={loggedWallet}
            />
            <button
              type="button"
              className="relative ml-2 flex inline-flex min-w-min content-center items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 active:translate-y-px"
              onClick={dispatchEventForLogin}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="max-w-screen-md p-2">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            Input smart contract address
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="text"
              id="text"
              className={`sm:text-smr block w-full rounded-md ${
                contractAddressIsValid ? "border-green-300" : "border-red-300"
              }  shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              value={contractAddress}
              onChange={handleContractAddressChange}
            />
          </div>
        </div>
        <div className="max-w-screen-md p-2">
          <div className="mt-1">
            <TextAreaResult
              label="Contract ABI:"
              text={JSON.stringify(contractAbi)}
            />
          </div>
        </div>
        <Navbar
          navbarState={readIsActive}
          handleNavbarState={handleReadIsActive}
        />
        <ListOfMethods contractAbi={contractAbi} navbarState={readIsActive} />
      </div>
    </div>
  );
}
