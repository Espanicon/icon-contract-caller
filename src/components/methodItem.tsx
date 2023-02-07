import { useState } from "react";
import TextAreaResult from "./textAreaResult";
import InputItem from "./inputItem";
import type { MethodItemPropsType } from "../types";

export default function MethodItem({ method }: MethodItemPropsType) {
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
