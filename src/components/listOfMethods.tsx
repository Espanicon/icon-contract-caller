import MethodItem from "./methodItem";
import type { ListPropsType } from "../types";

export default function ListOfMethods({
  contractAbi,
  navbarState,
}: ListPropsType) {
  return contractAbi.error == null ? (
    navbarState ? (
      <ul role="list" className="divide-y divide-gray-200">
        {contractAbi.map((method, index) => {
          if (method != null) {
            return method.readonly == "0x1" ? (
              <li key={`${method.name ?? "key"}-${index}`} className="py-2">
                <MethodItem method={method} />
              </li>
            ) : null;
          }
        })}
      </ul>
    ) : (
      <ul role="list" className="divide-y divide-gray-200">
        {contractAbi.map((method, index) => {
          return method.readonly != "0x1" ? (
            <li key={`${method.name ?? "key"}-${index}`} className="py-2">
              <MethodItem method={method} />
            </li>
          ) : null;
        })}
      </ul>
    )
  ) : null;
}
