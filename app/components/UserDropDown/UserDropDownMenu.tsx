import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

export default function DropDownMenu() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="rounded-full">
        {/* User Profile Image as Dropdown Trigger */}
        <img
          src={user?.picture || "/default-profile-image.png"} // Default image if user picture is not available
          alt="User Icon"
          className="border-4 border-white w-12 h-12 rounded-full object-cover hover:border-gray-400 transition-colors duration-100 mx-16"
        />
      </MenuButton>

      <MenuItems className="border-2 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <MenuItem>
            {/* Head to profile page */}
            {({ active }) => (
              <a
                href="/pages/profile"
                className={`bg-gray-800 block px-4 py-2 text-sm text-white ${
                  active ? "bg-gray-900 text-gray-900" : ""
                }`}
              >
                Profile
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {/* Log Out */}
            {({ active }) => (
              <a
                href="/api/auth/logout"
                className={`bg-gray-800 block px-4 py-2 text-sm text-white ${
                  active ? "bg-gray-900 text-gray-900" : ""
                }`}
              >
                Logout
              </a>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
