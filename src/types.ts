type IO = Array<{ name: string; type: string }>;

export type AbiMethod = {
  inputs?: IO;
  name?: string;
  outputs?: Array<{ type: string }>;
  readonly?: string;
  type?: string;
};

export type DashboardPropsType = {
  abi: AbiMethod;
};
