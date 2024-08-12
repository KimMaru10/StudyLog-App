import type { Metadata } from "next";
import "./globals.css";
import RecoilRootWrapper from "./components/RecoilWrapper";
import { Nanum_Gothic } from "next/font/google";

//구글 폰트
const nanum = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

//페이지 메타 데이터 설정
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
      <body className={nanum.className}>
        <div className="ConditionalBackground">
          <div className="HomeLayout__block">
            <div className="responsive_mainResponsive">
              <RecoilRootWrapper>{children}</RecoilRootWrapper>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
