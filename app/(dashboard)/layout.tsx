import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs"

import {ToasterProvider} from "@/providers/toast-provider"
import {ModalProvider} from "@/providers/modal-provider"

import { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider>
          <html lang="en">
              <body>
                  <ThemeProvider
                      attribute="class"
                      defaultTheme="dark"
                      enableSystem
                      disableTransitionOnChange
                  >
                      <SignedOut>
                          <RedirectToSignIn />
                      </SignedOut>
                      <SignedIn />
                      <ToasterProvider />
                      <ModalProvider />
                      {children}
                  </ThemeProvider>
              </body>
          </html>
      </ClerkProvider>
  )
}