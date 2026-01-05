import "./globals.css";
import { DriverProvider } from "@/contexts/DriverContext";
import { AuthProvider } from "@/contexts/AuthContext";
import type { ReactNode } from "react";

export const metadata = {
  title: "My Tracking App",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <DriverProvider>
            {children}
          </DriverProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
