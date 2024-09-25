import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider, RedirectToSignIn, SignedOut } from '@clerk/nextjs'

import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";


export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider/>
            <ModalProvider/>
            <header>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </header>
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}