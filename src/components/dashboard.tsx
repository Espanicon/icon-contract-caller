import { useState } from "react";
import type {
  ContractAbiType,
  MethodItemPropsType,
  InputItemPropsType,
  NavbarPropsType,
  ListPropsType,
  TextAreaResultPropsType,
} from "../types";
import abi from "../utils/testAbi";

const defaultContract = "cx0000000000000000000000000000000000000000";
export default function Dashboard() {
  const [contractAbi, setContractAbi] = useState<ContractAbiType>(abi);
  const [readIsActive, setReadIsActive] = useState(false);
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
              defaultValue="Mainnet"
            >
              <option>Mainnet</option>
              <option>Lisbon</option>
              <option>Custom</option>
            </select>
            <input
              readOnly={true}
              type="text"
              name="text"
              id="text"
              className="my-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Mainnet"
            />
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
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={defaultContract}
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
        <List contractAbi={contractAbi} navbarState={readIsActive} />
      </div>
    </div>
  );
}

const navbarTabState = {
  active:
    "active inline-block rounded-t-lg bg-gray-100 p-4 text-blue-600 dark:bg-gray-800 dark:text-blue-500",
  notActive:
    "inline-block rounded-t-lg p-4 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300",
};

function Navbar({ navbarState, handleNavbarState }: NavbarPropsType) {
  function handleSelectReadTab() {
    handleNavbarState(true);
  }

  function handleSelectWriteTab() {
    handleNavbarState(false);
  }

  return (
    <ul className="mt-5 flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <li className="mr-2">
        <a
          href="#"
          aria-current="page"
          onClick={handleSelectReadTab}
          className={
            navbarState ? navbarTabState.active : navbarTabState.notActive
          }
        >
          Read Contract
        </a>
      </li>
      <li className="mr-2">
        <a
          href="#"
          onClick={handleSelectWriteTab}
          className={
            navbarState ? navbarTabState.notActive : navbarTabState.active
          }
        >
          Write Contract
        </a>
      </li>
    </ul>
  );
}

function List({ contractAbi, navbarState }: ListPropsType) {
  return navbarState ? (
    <ul role="list" className="divide-y divide-gray-200">
      {contractAbi.map((method, index) => {
        if (method != null) {
          return method.readonly == "0x1" ? (
            <li key={`${method.name}-${index}`} className="py-2">
              <MethodItem method={method} />
            </li>
          ) : (
            <></>
          );
        }
      })}
    </ul>
  ) : (
    <ul role="list" className="divide-y divide-gray-200">
      {contractAbi.map((method, index) => {
        return method.readonly != "0x1" ? (
          <li key={`${method.name}-${index}`} className="py-2">
            <MethodItem method={method} />
          </li>
        ) : (
          <></>
        );
      })}
    </ul>
  );
}

function MethodItem({ method }: MethodItemPropsType) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((state) => {
      return !state;
    });
  }
  return (
    <div className="flex flex-col divide-y divide-solid rounded border border-gray-300">
      <div
        className="flex cursor-pointer bg-gray-100 py-2 px-4"
        onClick={toggleOpen}
      >
        <span className="mr-auto">{method.name}</span>
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
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <div className={isOpen ? "p-2" : "hidden"}>
        {method.inputs!.length > 0 ? (
          <>
            {method.inputs!.map((input, index) => {
              return (
                <div
                  key={
                    input.name != null ? `${input.name}-${index}` : `${index}`
                  }
                >
                  <InputItem input={input} />
                </div>
              );
            })}
            <button
              type="button"
              className="relative mb-2 flex inline-flex w-1/4 min-w-min content-center items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 active:translate-y-px"
            >
              Query
            </button>
            <TextAreaResult label="Query Result:" />
          </>
        ) : (
          <>
            <TextAreaResult label="Query Result:" />
          </>
        )}
      </div>
    </div>
  );
}

function InputItem({ input }: InputItemPropsType) {
  return (
    <div className="my-2">
      <label
        htmlFor="input"
        className="block text-sm font-medium text-gray-700"
      >
        {input.name} ({input.type}):
      </label>
      <div className="mt-1 text-gray-200">
        <input
          type="text"
          name="text"
          className="block w-full rounded-md border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}

function TextAreaResult({ label, text = "" }: TextAreaResultPropsType) {
  return (
    <div>
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <textarea
          readOnly={true}
          rows={4}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          defaultValue={"RPC JSON Response."}
          value={text}
        />
      </div>
    </div>
  );
}
