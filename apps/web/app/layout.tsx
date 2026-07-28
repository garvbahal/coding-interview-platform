import { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: {
    default: "CodeNest",
    template: "%s | CodeNest",
  },
  description:
    "CodeNest is a real-time coding interview platform with collaborative code editing, code execution, and live chat.",

  openGraph: {
    title: "CodeNest",
    description:
      "Real-time coding interviews with collaborative editing and code execution.",
    url: "https://askdocs.dev",
    siteName: "CodeNest",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeNest",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
