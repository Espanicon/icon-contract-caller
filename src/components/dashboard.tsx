import { useState } from "react";
import type { DashboardPropsType } from "../types";

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
