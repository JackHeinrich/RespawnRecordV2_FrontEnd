// /app/profile/page.js

"use client"; // Ensures that this component is rendered on the client side

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import TopBar from "../../components/TopBar/TopBar";

import ProfileInfo from "@/app/components/ProfileInfo/ProfileInfo";

import Spacer from "@/app/components/Spacer/Spacer";

export default withPageAuthRequired(function Profile({ user }) {
  return (
    <>
      <Spacer />
      <TopBar />
      <ProfileInfo profileUser={user} />
      <div className="bg-gray-900 flex flex-col gap-8 items-center p-4">
        <h1 className="font-bold">Games Played</h1>
      </div>
    </>
  );
});
