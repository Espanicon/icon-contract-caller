import type { InputItemPropsType } from "../types";

export default function InputItem({ input }: InputItemPropsType) {
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
