"use client";

import React, { useState } from "react"; // Import useState hook

import Spacer from "@/app/components/Spacer/Spacer";
import TopBar from "@/app/components/TopBar/TopBar";

import { updateNickname } from "@/app/api/auth0/auth0Controller";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function Page() {
  const [nickname, setNickname] = useState(""); // State for nickname input
  const [message, setMessage] = useState(null); // State for success/error message
  const { user, error: userError, isLoading } = useUser();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Call the function to update the nickname
    try {
      const response = await updateNickname(user?.user_id, nickname);
      console.log(response);
      setMessage({ text: "Nickname updated successfully.", type: "success" }); // Set success message
      setNickname(""); // Clear the input field
    } catch (error) {
      console.error(error);
      setMessage({ text: "Failed to update nickname.", type: "error" }); // Set error message
    }
  };

  return (
    <>
      <TopBar />
      <Spacer />
      <div className="flex flex-col items-center p-8">
        <h1 className="text-xl font-bold mb-4">Change Nickname</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="nickname" className="block text-white mb-2">
              New Nickname
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)} // Update state on input change
              className="border rounded py-2 px-3 w-full bg-gray-700"
              required
            />
          </div>
          {userError && (
            <p className="text-red-500 mb-4">Error: {userError.message}</p>
          )}{" "}
          {/* Display user error message */}
          {message && (
            <p
              className={
                message.type === "success"
                  ? "text-green-500 mb-4"
                  : "text-red-500 mb-4"
              }
            >
              {message.text}
            </p>
          )}
          {/* Display success or error message */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Update Nickname
          </button>
        </form>
      </div>
    </>
  );
}
