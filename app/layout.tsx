import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyLog",
  description: "Record your learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="ConditionalBackground">
          <div className="HomeLayout__block">
            <div className="responsive_mainResponsive">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
