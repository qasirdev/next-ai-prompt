import "@/styles/globals.css";

import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["greek"] });

// openGraph is used by social media
export const metadata: Metadata = {
  title: "AI Prompt With Next 14",
  description: "Discover & Share AI Prompts with Next 14",
  openGraph: {
    title: "Next 14 AI Prompt",
    description: "Discover & Share AI Prompts with Next 14",
    siteName: "qasir.co.uk",
    images: [
      {
        url: "/assets/images/me.jpeg",
        width: 36,
        height: 36,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
