import { useState, useEffect } from "react";
import TextAreaResult from "./textAreaResult";
import InputItem from "./inputItem";
import type {
  MethodItemPropsType,
  AbiMethod,
  RpcObjType,
  InputParamType,
  ParamsObjType,
} from "../types";
import utils from "../utils/utils";
import { useGlobalContext } from "../context/globalContext";

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

function getInitState(
  arrayOfInputs: AbiMethod["inputs"]
): Array<InputParamType> {
  if (arrayOfInputs == null) {
    return [];
  } else {
    if (arrayOfInputs.length === 0) {
      return [];
    } else {
      const result = arrayOfInputs.map((each) => {
        return {
          ...each,
          value: "",
        };
      });

      return result;
    }
  }
}

export default function MethodItem({ method }: MethodItemPropsType) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputStates, setInputStates] = useState<Array<InputParamType>>(
    getInitState(method.inputs)
  );
  const [textAreaContent, setTextAreaContent] = useState<string>("");
  const {
    loggedWallet,
    nodeUrl,
    nodeUrlIsValid,
    nodeNid,
    contractAddress,
    contractAddressIsValid,
  } = useGlobalContext();

  function toggleOpen() {
    setIsOpen((state) => {
      return !state;
    });
  }

  function handleInputChange(data: string, index: number) {
    setInputStates((state) => {
      const latestState = [...state];
      const inputState = latestState[index];
      if (inputState != null) {
        inputState["value"] = data;
      }
      return latestState;
    });
  }

  async function makeCustomRequest(
    contract: string,
    method: string,
    url: string,
    params: ParamsObjType = {}
  ) {
    const query = await utils.makeRpcCustomRequest(
      contract,
      method,
      url,
      params
    );

    const stringified = JSON.stringify(query);
    setTextAreaContent(stringified);
  }

  function handleOnClick() {
    // TODO: build here
    const params = utils.getParamsFromArray(inputStates);
    makeCustomRequest(contractAddress, method.name, nodeUrl, params);
  }

  useEffect(() => {
    async function fetchResult() {
      const query = await utils.makeRpcCustomRequest(
        contractAddress,
        method.name,
        nodeUrl
      );

      const stringified = JSON.stringify(query);
      setTextAreaContent(stringified);
    }

    if (method.inputs!.length === 0) {
      fetchResult();
    }
  }, []);
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
        {inputStates.length > 0 ? (
          <>
            {inputStates.map((input, index) => {
              return (
                <div
                  key={
                    input.name != null ? `${input.name}-${index}` : `${index}`
                  }
                >
                  <InputItem
                    input={input}
                    index={index}
                    handler={handleInputChange}
                  />
                </div>
              );
            })}
            <button
              type="button"
              className="relative mb-2 flex inline-flex w-1/4 min-w-min content-center items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 active:translate-y-px"
              onClick={handleOnClick}
            >
              Query
            </button>
            <TextAreaResult label="Query Result:" text={textAreaContent} />
          </>
        ) : (
          <>
            <TextAreaResult label="Query Result:" text={textAreaContent} />
          </>
        )}
      </div>
    </div>
  );
}
