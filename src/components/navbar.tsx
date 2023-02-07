import type { NavbarPropsType } from "../types";

const navbarTabState = {
  active:
    "active inline-block rounded-t-lg bg-gray-100 p-4 text-blue-600 dark:bg-gray-800 dark:text-blue-500",
  notActive:
    "inline-block rounded-t-lg p-4 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300",
};

export default function Navbar({
  navbarState,
  handleNavbarState,
}: NavbarPropsType) {
  function handleSelectReadTab() {
    handleNavbarState(true);
  }

  function handleSelectWriteTab() {
    handleNavbarState(false);
  }

  return (
    <ul className="mt-5 flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <li className="mr-2">
        <a
          href="#"
          aria-current="page"
          onClick={handleSelectReadTab}
          className={
            navbarState ? navbarTabState.active : navbarTabState.notActive
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
            navbarState ? navbarTabState.notActive : navbarTabState.active
          }
        >
          Write Contract
        </a>
      </li>
    </ul>
  );
}
