"use client"; // Ensures that this component is rendered on the client side

import Login from "../Login/Login";

import { useUser } from "@auth0/nextjs-auth0/client";

import UserDropDownMenu from "../UserDropDown/UserDropDownMenu";

import SearchBar from "../SearchBar/SearchBar";

export default function TopBar() {
  const { user, error, isLoading } = useUser();

  const topBarClass = "flex justify-center w-full bg-gray-900 p-6 min-w-96";

  const boldText = "text-5xl font-bold";

  if (isLoading)
    return (
      <div className={topBarClass}>
        <b className={boldText}>Loading...</b>
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <div className={topBarClass}>
      <div className="flex flex-col justify-center items-center w-1/4">
        <a className={boldText} href="/">
          {/* Container for Title, Search Bar, and Profile */}
          RespawnRecord
        </a>
      </div>
      <div className="flex flex-col justify-center items-center w-1/4">
        <SearchBar />
      </div>
      <div className="flex flex-col justify-center items-center w-1/4">
        {user ? <UserDropDownMenu /> : <Login />}
      </div>
    </div>
  );
}
