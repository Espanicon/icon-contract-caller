import { useState } from "react";
import type {
  DashboardPropsType,
  MethodItemPropsType,
  InputItemPropsType,
} from "../types";

export default function Dashboard({ abi }: DashboardPropsType) {
  return (
    <div className="w-full max-w-screen-xl overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="max-w-screen-md">
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
              placeholder="cx0000000000000000000000000000000000000000"
            />
          </div>
        </div>
        <Navbar />
        <List abi={abi} />
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

function Navbar() {
  const [readIsActive, setReadIsActive] = useState(false);

  function handleSelectReadTab() {
    setReadIsActive(true);
  }

  function handleSelectWriteTab() {
    setReadIsActive(false);
  }

  return (
    <ul className="mt-5 flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <li className="mr-2">
        <a
          href="#"
          aria-current="page"
          onClick={handleSelectReadTab}
          className={
            readIsActive ? navbarTabState.active : navbarTabState.notActive
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
            readIsActive ? navbarTabState.notActive : navbarTabState.active
          }
        >
          Write Contract
        </a>
      </li>
    </ul>
  );
}

function List({ abi }: DashboardPropsType) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {abi.map((method, index) => (
        <li key={`${method.name}-${index}`} className="py-4">
          <MethodItem method={method} />
        </li>
      ))}
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
    <div className="flex flex-col divide-y divide-solid rounded border border-indigo-600 py-1 px-4">
      <div className="m-4 flex cursor-pointer" onClick={toggleOpen}>
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
        {method.inputs!.map((input) => {
          return <InputItem input={input} />;
        })}
      </div>
    </div>
  );
}

function InputItem({ input }: InputItemPropsType) {
  return (
    <div>
      <label
        htmlFor="input"
        className="block text-sm font-medium text-gray-700"
      >
        {input.name} ({input.type}):
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="text"
          className="block w-full rounded-md border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}
