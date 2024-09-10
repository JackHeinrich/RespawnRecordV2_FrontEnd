import "./globals.css";

// app/layout.jsx
import { ReactNode } from "react"; // Import ReactNode to type children
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}
