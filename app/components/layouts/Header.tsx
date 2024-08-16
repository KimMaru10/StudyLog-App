"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import bell from "../../../public/assets/imgs/bell.svg";
import search from "../../../public/assets/imgs/search.svg";
import userIcon from "../../../public/assets/imgs/userIcon.png";
import loginImage from "../../../public/assets/imgs/loginImage.svg";
import close from "../../../public/assets/imgs/close.svg";
import studyLogIcon from "../../../public/assets/imgs/studyLogIcon.svg";
import { loginUser, logoutUser } from "@/utils/supabaseUser";
import { userState } from "@/recoil/user";
import { useRecoilState } from "recoil";

interface HeaderProps {
  name?: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const modalBackground = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useRecoilState(userState);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 로그인 시도
      const { data, error } = await loginUser(email, password);
      // 에러가 있는 경우 처리
      if (error) {
        alert(error.message || "로그인에 실패했습니다. 다시 시도해주세요.");
        return;
      }
      // 로그인 성공 시
      if (data?.user) {
        setUser((prevState) => ({
          ...prevState,
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
        }));
        console.log("유저정보 : ", user);
        setLoggedIn(true);
        handleClose();
      } else {
        // 데이터가 없는 경우에 대한 처리 (실패)
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error: any) {
      // 예외 처리: 예상치 못한 에러에 대한 처리
      console.error("로그인 실패", error);
      alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleLogout = async () => {
    const error = await logoutUser();
    if (!error) {
      setLoggedIn(false);
      setDropdownOpen(false);
    } else {
      console.log("로그아웃 하는 도중에 오류 발생 ", error);
    }
  };

  return (
    <div className="flex justify-between items-center w-full py-[12px]">
      {!name ? (
        <Link href="/">
          <p className="font-hack-bold text-2xl text-[#212529]">StudyLog</p>
        </Link>
      ) : (
        <div className="flex">
          <Link href={"/"}>
            <Image src={studyLogIcon} alt="studyLogIcon" />
          </Link>
          <Link href={`/${name}`} className="ml-[16px]">
            <p className="font-hack-bold text-2xl">{name}.StudyLog</p>
          </Link>
        </div>
      )}
      {loggedIn ? (
        <div className="flex items-center">
          <div className="mx-1 hover:bg-[#EFEFEF] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
            <Image src={bell} alt="bell icon" className="w-[20px] h-[20px]" />
          </div>
          <div className="mx-1 hover:bg-[#EFEFEF] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
            <Image
              src={search}
              alt="search icon"
              className="w-[20px] h-[20px]"
            />
          </div>
          <Link
            href="/write"
            className=" flex justify-center items-center h-[32px] "
          >
            <button className="w-full h-full mx-3 px-4 py-[1px] rounded-[15px] border-[1px] border-black text-black hover:bg-black hover:text-[#ffffff]">
              새 글 작성
            </button>
          </Link>
          <div
            className="cursor-pointer relative"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="flex items-center">
              <Image
                src={userIcon}
                alt="유저 아이콘"
                className="w-[40px] h-[40px] rounded-[50%] bg-[#fffff] shadow-md"
              />
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-6 h-6"
              >
                <path d="M7 10l5 5 5-5z"></path>
              </svg>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 top-[50px] w-[150px] mt-4 bg-white border shadow-md rounded-lg z-20">
                <Link href="/mypage">
                  <p className="p-3 hover:bg-gray-100 hover:text-[#20c997] cursor-pointer">
                    마이페이지
                  </p>
                </Link>
                <p
                  className="p-3 hover:bg-gray-100 hover:text-[#20c997] cursor-pointer"
                  onClick={handleLogout}
                >
                  로그아웃
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="mx-1 hover:bg-[#EFEFEF] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
            <Image src={bell} alt="bell icon" className="w-[20px] h-[20px]" />
          </div>
          <div className="mx-1 hover:bg-[#EFEFEF] rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
            <Image
              src={search}
              alt="search icon"
              className="w-[20px] h-[20px]"
            />
          </div>
          <div
            className="flex justify-center items-center w-[80px] h-[32px] bg-black text-white mx-3 rounded-[15px] hover:opacity-50"
            onClick={() => setModalOpen(true)}
          >
            <p>로그인</p>
          </div>
          {modalOpen && (
            <div
              className="z-10 w-full h-full fixed top-0 left-0 flex justify-center items-center bg-white bg-opacity-80"
              ref={modalBackground}
              onClick={(e) => {
                if (e.target === modalBackground.current) {
                  handleClose();
                }
              }}
            >
              <div
                className={`flex w-[600px] h-[540px] bg-white shadow-lg ${
                  isClosing ? "animate-slideDown" : "animate-slideUp"
                }`}
              >
                <div className="flex flex-col justify-center items-center w-[35%] h-full bg-[#F8F9FA] p-1">
                  <Image src={loginImage} alt="로그인 일러스트" />
                  <p className="text-2xl font-bold text-[#424242]">
                    환영합니다 !
                  </p>
                </div>
                <form
                  className="w-[65%] h-full p-[1.5em]"
                  onSubmit={handleLogin}
                >
                  <div className="flex justify-end mb-[32px]">
                    <Image src={close} alt="x" onClick={handleClose} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">로그인</h2>
                    <div>
                      <h4 className="my-[16px] text-[#868E96] font-bold">
                        이메일
                      </h4>
                      <input
                        type="text"
                        placeholder="이메일을 입력하세요."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-[45px] px-[10px] border rounded-[5px]"
                        required
                      />
                    </div>
                    <div>
                      <h4 className="my-[16px] text-[#868E96] font-bold">
                        비밀번호
                      </h4>
                      <input
                        type="password"
                        placeholder="비밀번호를 입력하세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-[45px] px-[10px] border rounded-[5px]"
                        required
                      />
                    </div>
                    <button className="w-full h-[45px] bg-[#12B886] rounded-[5px] my-[16px] text-white">
                      로그인
                    </button>
                    <div className="flex justify-center">
                      <span className="text-[#868E96]">
                        아직 회원이 아니신가요?&nbsp;
                      </span>
                      <span className="text-[#12B886]">
                        <Link href="/join" onClick={() => setModalOpen(false)}>
                          회원가입
                        </Link>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
