import type { Dispatch } from "react";
type IO = Array<{ name: string; type: string }>;

export type AbiMethod = {
  inputs?: IO;
  name: string;
  outputs?: Array<{ type: string }>;
  readonly?: string;
  type?: string;
};

export type ContractAbiType = Array<AbiMethod>;

export type ListPropsType = {
  contractAbi: ContractAbiType;
  navbarState: boolean;
};

export type MethodItemPropsType = {
  method: AbiMethod;
};

export type InputItemPropsType = {
  input: { name: string; type: string };
};

export type NavbarPropsType = {
  navbarState: boolean;
  handleNavbarState: Dispatch<boolean>;
};

export type TextAreaResultPropsType = {
  label: string;
  text?: string;
};
