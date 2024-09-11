"use client"; // Ensures that this component is rendered on the client side

import Login from "../Login/Login";
import { useUser } from "@auth0/nextjs-auth0/client";
import UserDropDownMenu from "../UserDropDown/UserDropDownMenu";
import SearchBar from "../SearchBar/SearchBar";

export default function TopBar() {
  const { user, error, isLoading } = useUser();

  // Updated class to make the top bar fixed at the top of the screen
  const topBarClass =
    "flex justify-center w-full bg-gray-900 p-6 min-w-96 fixed top-0 z-50 shadow-md"; // Added `fixed top-0 z-50`

  const containerDivClass = "flex flex-col justify-center items-center w-1/3";

  // Style the title with responsive font size
  const titleClass = "font-bold text-center text-[3vw] leading-none"; // `3vw` scales based on viewport width

  if (isLoading)
    return (
      <div className={topBarClass}>
        <b className={titleClass}>Loading...</b>
      </div>
    );

  if (error) return <div>{error.message}</div>;

  return (
    <div className={topBarClass}>
      <div className={containerDivClass}>
        <a className={titleClass} href="/">
          {/* Container for Title, Search Bar, and Profile */}
          RespawnRecord
        </a>
      </div>
      <div className={containerDivClass}>
        <SearchBar />
      </div>
      <div className={containerDivClass}>
        {user ? <UserDropDownMenu /> : <Login />}
      </div>
    </div>
  );
}
