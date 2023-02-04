type IO = Array<{ name: string; type: string }>;

export type AbiMethod = {
  inputs?: IO;
  name?: string;
  outputs?: Array<{ type: string }>;
  readonly?: string;
  type?: string;
};

export type ContractAbi = Array<AbiMethod>;

export type DashboardPropsType = {
  abi: ContractAbi;
};

export type MethodItemPropsType = {
  method: AbiMethod;
};

export type InputItemPropsType = {
  input: { name: string; type: string };
};
