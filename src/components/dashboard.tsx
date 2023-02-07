import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import Navbar from "./navbar";
import ListOfMethods from "./listOfMethods";
import TextAreaResult from "./textAreaResult";
import type { ContractAbiType, NetworksType } from "../types";

import utils from "../utils/utils";

export default function Dashboard() {
  const [networkState, setNetworkState] = useState<string>(
    utils.networkKeys[0]!
  );
  const [customNetworkState, setCustomNetworkState] = useState<string>("");
  const [contractAbi, setContractAbi] = useState<ContractAbiType>([]);
  const [readIsActive, setReadIsActive] = useState(true);
  const [contractAddress, setContractAddress] = useState(
    utils.contracts[networkState as NetworksType].governance
  );
  const [contractAddressIsValid, setContractAddressIsValid] = useState(true);

  function handleNetworkChange(evnt: ChangeEvent<HTMLSelectElement>) {
    setNetworkState(evnt.target.value);
  }

  function handleCustomNetworkChange(evnt: ChangeEvent<HTMLInputElement>) {
    setCustomNetworkState(evnt.target.value);
  }

  function handleContractAddressChange(evnt: ChangeEvent<HTMLInputElement>) {
    const isValid = utils.isScoreValid(evnt.target.value);
    setContractAddressIsValid(isValid);
    setContractAddress(evnt.target.value);
  }

  useEffect(() => {
    async function fetchAbi(network: string, nid: number) {
      const abi = await utils.fetchAbi(contractAddress, network, nid);

      setContractAbi(abi);
    }

    if (networkState === "custom") {
      if (contractAddressIsValid) {
        const network = customNetworkState;
        const nid = utils.networks["custom"].nid;
        fetchAbi(network, nid);
      } else {
        setContractAbi([]);
      }
    } else {
      if (contractAddressIsValid) {
        const network =
          utils.networks[networkState as unknown as NetworksType].hostname;
        const nid = utils.networks[networkState as unknown as NetworksType].nid;
        fetchAbi(network, nid);
      } else {
        setContractAbi([]);
      }
    }
  }, [
    contractAddressIsValid,
    contractAddress,
    networkState,
    customNetworkState,
  ]);

  return (
    <div className="w-full min-w-min max-w-screen-xl overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="max-w-screen-md p-2">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            Select Network:
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
              <input
                type="text"
                name="text"
                id="text"
                className="my-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={customNetworkState}
                onChange={handleCustomNetworkChange}
              />
            ) : (
              <input
                readOnly={true}
                type="text"
                name="text"
                id="text"
                className="my-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={
                  utils.networks[networkState as unknown as NetworksType]
                    .hostname
                }
              />
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
              id="text"
              className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="hx0000..000"
            />
            <button
              type="button"
              className="relative ml-2 flex inline-flex min-w-min content-center items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 active:translate-y-px"
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
          handleNavbarState={setReadIsActive}
        />
        <ListOfMethods contractAbi={contractAbi} navbarState={readIsActive} />
      </div>
    </div>
  );
}
