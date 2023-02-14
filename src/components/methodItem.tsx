import { useState, useEffect } from "react";
import TextAreaResult from "./textAreaResult";
import InputItem from "./inputItem";
import type {
  MethodItemPropsType,
  AbiMethod,
  RpcObjType,
  InputParamType,
  ParamsObjType,
  TextAreaContentDict,
} from "../types";
import utils from "../utils/utils";
import { useGlobalContext } from "../context/globalContext";

function dispatchTxEvent(query: RpcObjType) {
  console.log("dispatched query");
  console.log(query);
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
  const [customTextArea, setCustomTextArea] = useState<string>("");
  const {
    loggedWallet,
    walletIsValid,
    nodeUrl,
    nodeNid,
    contractAddress,
    textAreaContent,
    setTextAreaContent,
    methodRef,
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

    if (setTextAreaContent != null) {
      const stringified = JSON.stringify(query) as unknown as string;
      // eslint-disable-next-line
      setTextAreaContent((state: TextAreaContentDict) => {
        const newState: TextAreaContentDict = { ...state };
        if (newState[contractAddress] == null) {
          newState[contractAddress] = {
            [method]: stringified,
          };
        } else {
          newState[contractAddress] = {
            ...newState[contractAddress],
            [method]: stringified,
          };
        }
        return newState;
      });
    } else {
      console.log("error setting state for response on textarea");
    }
  }

  function handleOnClick() {
    // TODO: build here
    if (walletIsValid) {
      const params = utils.getParamsFromArray(inputStates);
      if (method.readonly === "0x1") {
        // if "query" button is pressed on a readonly method.
        void makeCustomRequest(contractAddress, method.name, nodeUrl, params);
      } else {
        // if "query" button is pressed on a nonreadonly method.
        const queryObj = utils.makeJsonRpcObj(
          contractAddress,
          method.name,
          params,
          "icx_sendTransaction",
          loggedWallet,
          parseInt(nodeNid)
        );
        methodRef.current = method.name;
        dispatchTxEvent(queryObj);
      }
    } else {
      alert("No wallet has been selected");
    }
  }

  useEffect(() => {
    async function fetchResult() {
      const query = await utils.makeRpcCustomRequest(
        contractAddress,
        method.name,
        nodeUrl
      );

      const stringified = JSON.stringify(query);
      if (setTextAreaContent != null) {
        // eslint-disable-next-line
        setTextAreaContent((state: TextAreaContentDict) => {
          const newState: TextAreaContentDict = { ...state };
          if (newState[contractAddress] == null) {
            newState[contractAddress] = {
              [method.name]: stringified,
            };
          } else {
            newState[contractAddress] = {
              ...newState[contractAddress],
              [method.name]: stringified,
            };
          }
          return newState;
        });
      } else {
        console.log("error setting state for response on textarea");
      }
    }

    // eslint-disable-next-line
    if (method.inputs!.length === 0 && method.readonly === "0x1") {
      void fetchResult();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("textAreaContent");
    console.log(textAreaContent);
    const keys = Object.keys(textAreaContent);
    const methodNames =
      keys.length > 0
        ? keys.includes(contractAddress)
          ? // eslint-disable-next-line
            Object.keys(textAreaContent[contractAddress]!)
          : []
        : [];
    const methodValue = methodNames.includes(method.name)
      ? // eslint-disable-next-line
        textAreaContent[contractAddress]![method.name]
      : "";
    if (methodValue === "") {
      setCustomTextArea(methodValue);
    } else {
      const stringified = JSON.stringify(methodValue);
      setCustomTextArea(stringified);
    }
  }, [textAreaContent, contractAddress, method]);

  useEffect(() => {
    console.log("customTextArea");
    console.log(customTextArea);
  }, [customTextArea]);

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
            <TextAreaResult label="Query Result:" text={customTextArea} />
          </>
        ) : method.readonly === "0x1" ? (
          <>
            <TextAreaResult label="Query Result:" text={customTextArea} />
          </>
        ) : (
          <>
            <button
              type="button"
              className="relative mb-2 flex inline-flex w-1/4 min-w-min content-center items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 active:translate-y-px"
              onClick={handleOnClick}
            >
              Query
            </button>
            <TextAreaResult label="Query Result:" text={customTextArea} />
          </>
        )}
      </div>
    </div>
  );
}
