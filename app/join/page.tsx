"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signUp } from "@/utils/supabaseUser";
import { useRouter } from "next/navigation";

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userId, setUserId] = useState("");
  const [about, setAbout] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!termsAccepted) {
      alert("이용약관과 개인정보취급방침에 동의해야 합니다.");
      return;
    }

    if (isSubmitting) {
      return; // 이미 제출 중일 때는 아무 것도 하지 않음
    }

    setIsSubmitting(true);

    try {
      await signUp(email, password);
      alert("회원가입이 완료되었습니다!");
      router.push("/");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-[460px] h-full flex flex-col items-center">
        <div className="w-full h-full pt-[100px]">
          <div className="w-full h-[100px] flex justify-center items-center border-b-2 border-[#C8C8C8]">
            <p className="font-hack-bold text-[40px]">StudyLog</p>
          </div>
          <div className="w-full h-[100px] flex justify-center items-center">
            <p className="text-[30px] font-semibold">회원가입</p>
          </div>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full mb-5">
            <p className="text-[#989898] font-semibold text-base mb-2">
              이메일
            </p>
            <input
              type="email"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[45px] p-2 rounded-[5px] border-[1px] border-[#D7D7D7]"
              required
            />
          </div>
          <div className="w-full mb-5">
            <p className="text-[#989898] font-semibold text-base mb-2">
              비밀번호
            </p>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[45px] p-2 rounded-[5px] border-[1px] border-[#D7D7D7]"
              required
            />
          </div>
          <div className="w-full mb-5">
            <p className="text-[#989898] font-semibold text-base mb-2">
              비밀번호 확인
            </p>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력하세요."
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full h-[45px] p-2 rounded-[5px] border-[1px] border-[#D7D7D7]"
              required
            />
          </div>
          <div className="w-full mb-5">
            <p className="text-[#989898] font-semibold text-base mb-2">
              사용자ID
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="사용자ID를 입력하세요."
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full h-[45px] p-2 rounded-[5px] border-[1px] border-[#D7D7D7]"
                required
              />
              <button
                type="button"
                className="w-[65px] bg-[#12B886] text-white ml-3 rounded-[5px] text-xs"
              >
                중복확인
              </button>
            </div>
          </div>
          <div className="w-full mb-5">
            <p className="text-[#989898] font-semibold text-base mb-2">
              한줄 소개
            </p>
            <input
              type="text"
              placeholder="당신을 한줄로 소개해보세요."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full h-[45px] p-2 rounded-[5px] border-[1px] border-[#D7D7D7]"
            />
          </div>
          <div className="flex items-center w-full mb-5">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <Link href="policy/terms" className="ml-2 text-[#12B886] text-sm">
              이용약관
            </Link>
            <p className="text-sm">과&nbsp;</p>
            <Link href="policy/privacy" className="text-[#12B886] text-sm">
              개인정보취급방침
            </Link>
            <p className="text-sm">에 동의합니다.</p>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="w-[48%] h-[45px] bg-[#ffffff] text-black rounded-[30px] border-[1px] border-[#D7D7D7]"
              onClick={(e) => router.push("/")}
            >
              취소하기
            </button>
            <button
              type="submit"
              className="w-[48%] h-[45px] bg-[#12B886] text-white rounded-[30px]"
              disabled={isSubmitting} // 제출 중일 때 버튼 비활성화
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
